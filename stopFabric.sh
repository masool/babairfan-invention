cd ../blockchain-explorer/

docker-compose down -v

cd ../blockchain-veritable/veritable-network/

./veritable-network.sh down

cd ../web-app/server/

rm -rf wallet/

docker volume prune

cd ../../