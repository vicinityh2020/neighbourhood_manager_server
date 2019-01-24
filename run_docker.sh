#!/bin/sh
usage="$(basename "$0") [-h] [-p port -e env]
 -- Builds vcnt-app docker

where:
    -h  show this help text
    -p  port
    -e  environment"


# Default configutaion
PORT=3001
ENV="development"

# Get configuration
while getopts 'hd:p:e:' option; do
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
  esac
done

# Let's work
echo Building and running vcnt-app...
echo CLEANING...
docker kill vcnt-app
docker rm vcnt-app
docker rmi vcnt-app
echo BUILDING THE CONTAINER...
docker build -f Dockerfile.$ENV -t vcnt-app .
echo RUNNING THE CONTAINER...
docker run -d -p $PORT:3000 \
        -it \
        --rm \
        --name vcnt-app \
        --mount type=bind,source=/etc/letsencrypt/live/development.bavenir.eu/privkey.pem,target=/etc/letsencrypt/live/development.bavenir.eu/privkey.pem,readonly \
        --mount type=bind,source=/etc/letsencrypt/live/development.bavenir.eu/fullchain.pem,target=/etc/letsencrypt/live/development.bavenir.eu/fullchain.pem,readonly \
        --mount type=bind,source=/etc/letsencrypt/live/development.bavenir.eu/ca.pem,target=/etc/letsencrypt/live/development.bavenir.eu/ca.pem,readonly \
        vcnt-app:latest
echo DONE!
