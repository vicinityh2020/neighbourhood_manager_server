docker kill $(docker ps -q)
docker rm $(docker ps -q)
docker rmi $(docker ps -q)
