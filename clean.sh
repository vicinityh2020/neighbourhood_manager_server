docker kill $(docker ps -q)
docker rm vcnt-app
docker rmi vcnt-app
