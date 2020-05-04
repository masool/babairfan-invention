#!/bin/bash

echo 'printing keystore for notary'

ORG_1_KEYSTORE=$(ls ../../veritable-network/crypto-config/peerOrganizations/notary.veritable.com/users/Admin\@notary.veritable.com/msp/keystore/)
ORG_2_KEYSTORE=$(ls ../../veritable-network/crypto-config/peerOrganizations/client.veritable.com/users/Admin\@client.veritable.com/msp/keystore/)
ORG_3_KEYSTORE=$(ls ../../veritable-network/crypto-config/peerOrganizations/parties.veritable.com/users/Admin\@parties.veritable.com/msp/keystore/)

ORG_1_PATH_TO_KEYSTORE="Admin@notary.veritable.com/msp/keystore/"
ORG_2_PATH_TO_KEYSTORE="Admin@client.veritable.com/msp/keystore/"
ORG_3_PATH_TO_KEYSTORE="Admin@parties.veritable.com/msp/keystore/"

UPDATED_KEYSTORE_ORG_1="$ORG_1_PATH_TO_KEYSTORE$ORG_1_KEYSTORE"
UPDATED_KEYSTORE_ORG_2="$ORG_2_PATH_TO_KEYSTORE$ORG_2_KEYSTORE"
UPDATED_KEYSTORE_ORG_3="$ORG_3_PATH_TO_KEYSTORE$ORG_3_KEYSTORE"

echo $UPDATED_KEYSTORE_ORG_1

echo 'updating connection.yaml notary adminPrivateKey path with' ${UPDATED_KEYSTORE_ORG_1}

sed -i -e "s|Admin@notary.veritable.com/msp/keystore/.*|$UPDATED_KEYSTORE_ORG_1|g" connection.json

echo $UPDATED_KEYSTORE_ORG_2

echo 'updating connection.yaml client adminPrivateKey path with' ${UPDATED_KEYSTORE_ORG_2}

sed -i -e "s|Admin@client.veritable.com/msp/keystore/.*|$UPDATED_KEYSTORE_ORG_2|g" connection.json

echo $UPDATED_KEYSTORE_ORG_3

echo 'updating connection.yaml parties adminPrivateKey path with' ${UPDATED_KEYSTORE_ORG_3}

sed -i -e "s|Admin@parties.veritable.com/msp/keystore/.*|$UPDATED_KEYSTORE_ORG_3|g" connection.json

sleep 2

sed -i '74s/$/"/' ///home/irfan/Desktop/veritable-app/blockchain-backup/web-app/server/connection.json
sed -i '89s/$/"/' ///home/irfan/Desktop/veritable-app/blockchain-backup/web-app/server/connection.json
sed -i '104s/$/"/' ///home/irfan/Desktop/veritable-app/blockchain-backup/web-app/server/connection.json
# sed -i '74s/$/"/' ///home/irfan/Desktop/veritable-app/blockchain-veritable/web-app/server/connection.json
# sed -i '89s/$/"/' ///home/irfan/Desktop/veritable-app/blockchain-veritable/web-app/server/connection.json
# sed -i '104s/$/"/' ///home/irfan/Desktop/veritable-app/blockchain-veritable/web-app/server/connection.json