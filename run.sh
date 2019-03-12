#!/bin/bash
USAGE="$(basename "$0") [-h] [-p port -d domain -n app_name]
-- Builds vcnt-app docker on linux/mac
-- Examples
./run.sh -p 3000 -n app-name -d www.example.com
./run.sh -p 3000 -n app-name
Where:
  Flags:
      -h  shows help
  Options with argument:
      -n  <app_name> [ vcnt-app (default) ] [ OBLIGATORY ]
      -p  <port> [ 3000 (default) ] [ OBLIGATORY ]
      -d  <domain_name> [ OPTIONAL ]"

  # Default configuration
  NAME="vcnt-app"
  PORT=3000
  DOMAIN=false

  # Get configuration
  while getopts 'hd:p:d:n:' OPTION; do
    case "$OPTION" in
      h)
        echo "$USAGE"
        exit 0
        ;;
      p)
        PORT="$OPTARG"
        ;;
      n)
        NAME="$OPTARG"
        ;;
      d)
        DOMAIN="$OPTARG"
        ;;
    esac
  done

echo RUNNING THE CONTAINER...

# MODIFY FROM HERE WITH YOUR SETTING

# PARAMETERS

# Comment corresponding row in docker run if any
# optional paramenter is not going to be used

# Mandatory parameters are added as argument when
# the script is called

# logs path (OPTIONAL)
LOG_DIR=~/${NAME}_logs
# mongo path to the certificate (OPTIONAL)
MONGO_CERT=~/certificateMongo/ca.pem
# ssl private key (OPTIONAL)
KEY=/etc/letsencrypt/live/${DOMAIN}/privkey.pem
# ssl certificate (OPTIONAL)
CERT=/etc/letsencrypt/live/${DOMAIN}/fullchain.pem

# Comment 1st and 2nd --mount if no SSL
# Comment 3rd --mount if no certificate used with mongo
# Comment -v if you don't want to have the logs in your local machine
docker run -d -p $PORT:3000 \
        -it \
        --rm \
        --name ${NAME} \
        --mount type=bind,source=${KEY},target=/etc/letsencrypt/privkey.pem,readonly \
        --mount type=bind,source=${CERT},target=/etc/letsencrypt/fullchain.pem,readonly \
        --mount type=bind,source=${MONGO_CERT},target=/var/ca.pem,readonly \
        -v ${LOG_DIR}:/app/logs \
        ${NAME}:latest
