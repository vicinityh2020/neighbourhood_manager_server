#!/bin/bash
USAGE="$(basename "$0") [-h -l -t] [-p port -d domain -n app_name]
-- Builds vcnt-app docker on linux/mac
-- Examples
./run.sh -p 3000 -n app-name -d www.example.com
./run.sh -p 3000 -n app-name
./run.sh -l   // Runs setting for local environment
Where:
  Flags:
      -h  shows help
      -l  local mode
      -t  adds scheduled tasks (Directory must exist)
  Options with argument:
      -n  <app_name> [ vcnt-app (default) ] [ OBLIGATORY ]
      -p  <port> [ 3000 (default) ] [ OBLIGATORY ]
      -d  <domain_name> [ OPTIONAL ]"

  # Default configuration
  NAME="vcnt-app"
  PORT=3000
  DOMAIN=false
  LOCAL=false
  SCHEDULED=false

  # Get configuration
  while getopts 'hd:ld:td:p:d:n:' OPTION; do
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
      l)
        LOCAL=true
        ;;
      t)
        SCHEDULED=true
        ;;
    esac
  done

echo CLEANING OLD RUNNING CONTAINER...
  docker kill ${NAME} >/dev/null 2>&1
  docker rm ${NAME} >/dev/null 2>&1

echo RUNNING THE CONTAINER...

# MODIFY FROM HERE WITH YOUR SETTING

# PARAMETERS

# Comment corresponding row in docker run if any
# optional paramenter is not going to be used

# Mandatory parameters are added as argument when
# the script is called

if [ ${LOCAL} == true ]; then
  docker run -p $PORT:3000 \
        -it \
        --rm \
        --name ${NAME} \
        ${NAME}:latest

elif [ ${SCHEDULED} == true ]; then

  # logs path (OPTIONAL)
  LOG_DIR=~/docker_data/logs/${NAME}
  # mongo path to the certificate (OPTIONAL)
  MONGO_CERT=~/certificateMongo/
  # ssl private key (OPTIONAL)
  KEY=/etc/letsencrypt/live/${DOMAIN}/privkey.pem
  # ssl certificate (OPTIONAL)
  CERT=/etc/letsencrypt/live/${DOMAIN}/fullchain.pem
  # Workdir
  WORKDIR=~/vicinity_scheduled_tasks

  # Remove 1st and 2nd --mount if no SSL
  # Remove 3rd --mount if no certificate used with mongo
  # Remove -v if you don't want to have the logs in your local machine

  docker run -d -p $PORT:3000 \
          -it \
          --restart always \
          --name ${NAME} \
          --mount type=bind,source=${KEY},target=/etc/letsencrypt/privkey.pem,readonly \
          --mount type=bind,source=${CERT},target=/etc/letsencrypt/fullchain.pem,readonly \
          --mount type=bind,source=${MONGO_CERT}mongoCA.crt,target=/mongo/ssl/mongoCA.crt,readonly \
          --mount type=bind,source=${MONGO_CERT}mongo.pem,target=/mongo/ssl/mongo.pem,readonly \
          --mount type=bind,source=${WORKDIR}/statistics/statistics.log,target=/opt/vicinity_services/getStatistics/statistics.log,readonly \
          --mount type=bind,source=${WORKDIR}/annotations/annotations.json,target=/opt/vicinity_services/getAnnotations/annotations.json,readonly \
          --mount type=bind,source=./vcnt_server.config.js,target=/app/vcnt_server.config.js,readonly \
          -v ${LOG_DIR}:/app/logs \
          ${NAME}:latest

          echo "Success! Logs stored under ${LOG_DIR}"

    else

      # logs path (OPTIONAL)
      LOG_DIR=~/docker_data/logs/${NAME}
      # mongo path to the certificate (OPTIONAL)
      MONGO_CERT=~/certificateMongo/
      # ssl private key (OPTIONAL)
      KEY=/etc/letsencrypt/live/${DOMAIN}/privkey.pem
      # ssl certificate (OPTIONAL)
      CERT=/etc/letsencrypt/live/${DOMAIN}/fullchain.pem

      # Remove 1st and 2nd --mount if no SSL
      # Remove 3rd --mount if no certificate used with mongo
      # Remove -v if you don't want to have the logs in your local machine

      docker run -d -p $PORT:3000 \
              -it \
              --restart always \
              --name ${NAME} \
              --mount type=bind,source=${KEY},target=/etc/letsencrypt/privkey.pem,readonly \
              --mount type=bind,source=${CERT},target=/etc/letsencrypt/fullchain.pem,readonly \
              --mount type=bind,source=${MONGO_CERT}mongoCA.crt,target=/mongo/ssl/mongoCA.crt,readonly \
              --mount type=bind,source=${MONGO_CERT}mongo.pem,target=/mongo/ssl/mongo.pem,readonly \
              --mount type=bind,source=./vcnt_server.config.js,target=/app/vcnt_server.config.js,readonly \
              -v ${LOG_DIR}:/app/logs \
              ${NAME}:latest

              echo "Success! Logs stored under ${LOG_DIR}"
fi
