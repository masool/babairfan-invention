cd veritable-network
./veritable-network.sh down

docker stop $(docker ps -a -q)  ; docker rm -f $(docker ps -aq) ; docker system prune -a ; docker volume prune ; docker ps -a ; docker images -a ; docker volume ls

cd ../web-app/server

rm -rf wallet/

cd ../../

# docker system prune -a (delete all images)