# cd ../blockchain-explorer

# docker-compose down -v

# cd ../blockchain-veritable/veritable-network

cd veritable-network/

docker ps -a

# ./veritable-network.sh restart -l node -s couchdb

./veritable-network.sh restart -o etcdraft -l node -s couchdb

# echo "Please wait starting Blokchain-explorer network"

# sleep 5

# cd ../../blockchain-explorer

# docker-compose up -d

# sleep 15

# docker-compose up -d

# docker ps -a

# echo "Blokchain-explorer network has been launched successfully"