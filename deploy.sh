################################################ Blockchain Network automation script #################################################

cd veritable-network/

./veritable-network.sh down

docker stop $(docker ps -a -q)  ; docker rm -f $(docker ps -aq) ; docker system prune -a ; docker volume prune ; docker ps -a ; docker images -a ; docker volume l

cd ../web-app/server

rm -rf wallet/

cd ../../

# write script to clone source code from git repository and paste at this path
# After successfull cloning, extraction completed, then start running script to network up with following commands at this path

./startFabric.sh

# after shown END message as network launced successfully, run the script which stops NPM screen if any already running and then
#run the following script 

./deployapi.sh


# start the same screen again which detatched and run following command

npm start #this will start node middleware API

#save and close the screen

############################################# Blockchain Explorer automation script ##############################################

Note: prior to do any thing first down the docker containers by giving below command .

docker-compose down ; docker-compose down -v

#then automate the script following below tep by step procesure.

1) from home path can see two folders "Blockchain-explorer" and "veritablefabric"
2) cd blockchain-explorer/examples/net1/crypto/ and ls can see two folders "ordererOrganizations  peerOrganizations" remove these two folders.
3) cd ../../../../hyperledger-raft-jea/veritable-network/crypto-config/ can see "ordererOrganizations  peerOrganizations" folders just copy and paste to cd blockchain-explorer/examples/net1/crypto/ (path from above point).
4) copy key from cd peerOrganizations/notary.veritable.com/users/Admin@notary.veritable.com/msp/keystore/
5) cd
6) cd blockchain-explorer/examples/net1/connection-profile/ and ls can see first-network.json file, then vim first-network.json paste above copied key at line 40 and ends with double quotes.
7) cd ../../../
8)docker-compose up -d
# /************************** remove keys from CA DB **********************/
# docker exec -it ca_peerOrg1 bash
# apt-get update
# apt-get install sqlite3
# cd /etc/hyperledger/fabric-ca-server
# sqlite3 fabric-ca-server.db
# sqlite> .tables
# sqlite> select * from users;
# sqlite> select * from certificates;
# sqlite> delete from certificates where id='user1';
# sqlite> update users set state=0 where id='user1';
# sqlite> .exit
# # exit
# to clean up
# cd fabric-samples/first-network
# ./byfn.sh down
# docker rm $(docker ps -aq)
# docker rmi $(docker images dev-* -q)

