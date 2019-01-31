#!/bin/sh
usage="$(basename "$0") [-h] [-p port -e env -u user -d domain]
 -- Builds vcnt-app docker

where:
    -h  shows help
    -p  port
    -e  environment
    -u  user
    -d  server domain"

# Default configuration
PORT=3001
ENV="development"
USER=false
DOMAIN=false

# Get configuration
while getopts 'hd:p:e:u:d:' option; do
  case "$option" in
    h) echo "$usage"
      exit
      ;;
    e)
      ENV="$OPTARG"
      ;;
    p)
      PORT="$OPTARG"
      ;;
    u)
      USER="$OPTARG"
      ;;
    d)
      DOMAIN="$OPTARG"
      ;;
  esac
done

# Check mandatory arguments and set WORKDIR
if [ ${USER} == false ]; then
   echo "ERROR: Missing user"
   exit 1
elif [ ${DOMAIN} == false ]; then
   echo "ERROR: Missing domain"
   exit 1
else
  WORKDIR="/home/$USER/vicinity_nm_api/"
  echo CONFIGURATION READY...
fi

# Let's work
echo Building and running vcnt-app...
echo CLEANING...
docker kill vcnt-app >/dev/null 2>&1
docker rm vcnt-app >/dev/null 2>&1
docker rmi vcnt-app >/dev/null 2>&1
echo REVEAL SECRET FILES
cd ${WORKDIR} && git secret tell development@bavenir.eu
cd ${WORKDIR} && git secret tell api_vicinity_devone@bavenir.eu
cd ${WORKDIR} && git secret tell api_vicinity_devtwo@bavenir.eu
cd ${WORKDIR} && git secret reveal
echo BUILDING THE CONTAINER...
docker build -f ${WORKDIR}/Dockerfile.${ENV} -t vcnt-app ${WORKDIR}
echo SETTING A LOCAL FOLDER FOR THE LOGS...
mkdir -p /home/${USER}/vcnt-logs
echo RUNNING THE CONTAINER...
docker run -d -p $PORT:3000 \
        -it \
        --rm \
        --name vcnt-app \
        --mount type=bind,source=/etc/letsencrypt/live/${DOMAIN}/privkey.pem,target=/etc/letsencrypt/privkey.pem,readonly \
        --mount type=bind,source=/etc/letsencrypt/live/${DOMAIN}/fullchain.pem,target=/etc/letsencrypt/fullchain.pem,readonly \
        --mount type=bind,source=/home/${USER}/certificateMongo/ca.pem,target=/home/${USER}/certificateMongo/ca.pem,readonly \
        -v /home/${USER}/vcnt-logs:/app/logs \
        vcnt-app:latest
# Finish and close
echo DONE!
