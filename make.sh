#!/bin/bash
USAGE="$(basename "$0") [-h] [-e env -n name -m auth-mail -w workdir]
 -- Builds app docker on linux/mac
 -- Examples
 ./make.sh -p 3000 -e production -m my@gitsecret.mail
 ./make.sh -p 3000 -e development
 ./make.sh -e local -w .
Where:
  Flags:
    -h  shows help
  Options with argument:
    -n  <app_name> [ vcnt-app (default) ]
    -e  <environment> [ development, production, local (default) ]
    -m  <git_secret_auth_mail> [ If missing, using local config ]
    -w  <path_where_repository_was_cloned> [ ~/vicinity_nm_api (default) ]"

# Default configuration
NAME="vcnt-app"
ENV="development"
GIT_MAIL=false
WORKDIR=false

# Get configuration
while getopts 'hd:e:d:m:w:' OPTION; do
  case "$OPTION" in
    h)
      echo "$USAGE"
      exit 0
      ;;
    e)
      ENV="$OPTARG"
      ;;
    n)
      NAME="$OPTARG"
      ;;
    m)
      GIT_MAIL="$OPTARG"
      ;;
    w)
      WORKDIR="$OPTARG"
      ;;
  esac
done

# Set WORKDIR
if [ ${WORKDIR} == false ]; then
  WORKDIR=~/vicinity_nm_api
fi

# Check mandatory arguments and set WORKDIR
if [ ${GIT_MAIL} == false ]; then
  echo USING LOCAL CONFIG...
else
  echo USING GIT CONFIG...
  # cd ${WORKDIR} && git-secret tell development@bavenir.eu
  # cd ${WORKDIR} && git-secret tell api_vicinity_devone@bavenir.eu
  # cd ${WORKDIR} && git-secret tell api_vicinity_devtwo@bavenir.eu
  cd ${WORKDIR} && git-secret tell ${GIT_MAIL}
  cd ${WORKDIR} && git-secret reveal
fi

# Ensure configuration was created
if [ ! -f ${WORKDIR}/vcnt_server.config.js ]; then
   echo "ERROR: Missing configuration file..."
   exit 1
fi

echo CONFIGURATION READY

# Let's work
echo CLEANING OLD BUILD...
docker kill ${NAME} >/dev/null 2>&1
docker rm ${NAME} >/dev/null 2>&1
docker rmi ${NAME} >/dev/null 2>&1
echo BUILDING THE NEW CONTAINER...
docker build -f ${WORKDIR}/Dockerfile --build-arg myenv=${ENV} -t ${NAME} ${WORKDIR}
# Finish and close
echo DONE!
