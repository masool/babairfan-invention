
# Note: 1) run this script when starting application fresh  &
#       2) once teardown entire network, can run this script to start API
# rest all the times should not run

cd web-app/server

rm -rf wallet/

./updateKeystore.sh

sleep 5

npm install

echo "Enroll and register notary"
node enrollAdminNotary.js
node registerUserNotary.js

echo "Enroll and register Client"
node enrollAdminClient.js
node registerUserClient.js

echo "Enroll and register Parties"
node enrollAdminParties.js
node registerUserParties.js

echo "start middleware"
npm start
