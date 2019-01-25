#!/bin/sh
usage="$(basename "$0") [-h] [-p port -e env -u user]
 -- Builds vcnt-app docker

where:
    -h  shows help
    -p  port
    -e  environment
    -u  user"

# Default configutaion
PORT=3001
ENV="development"
USER="jorge"

# Get configuration
while getopts 'hd:p:e:u:' option; do
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
echo SETTING A LOCAL FOLDER FOR THE LOGS...
mkdir -p /home/$USER/vcnt-logs
echo RUNNING THE CONTAINER...
docker run -d -p $PORT:3000 \
        -it \
        --rm \
        --name vcnt-app \
        --mount type=bind,source=/etc/letsencrypt/live/development.bavenir.eu/privkey.pem,target=/etc/letsencrypt/live/development.bavenir.eu/privkey.pem,readonly \
        --mount type=bind,source=/etc/letsencrypt/live/development.bavenir.eu/fullchain.pem,target=/etc/letsencrypt/live/development.bavenir.eu/fullchain.pem,readonly \
        --mount type=bind,source=/home/jorge/certificateMongo/ca.pem,target=/home/jorge/certificateMongo/ca.pem,readonly \
        -v /home/$USER/vcnt-logs:/app/logs \
        vcnt-app:latest
# Finish and close
echo DONE!
