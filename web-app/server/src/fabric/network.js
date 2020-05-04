/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const FabricCAServices = require('fabric-ca-client');
const { FileSystemWallet, Gateway, X509WalletMixin } = require('fabric-network');
const fs = require('fs');
const path = require('path');

const ccpPath = path.resolve('connection.json');
const ccpJSON = fs.readFileSync(ccpPath, 'utf8');
const ccp = JSON.parse(ccpJSON);

/***************************************** CHAINCODES ***********************************************/

/****************************INVOKE CHAINCODE TO STORE NOTARY DETAILS********************************/
exports.putNotaryuser = async function(appId, first_name,last_name,username,phone,notary_license_number) {
    try {

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);
        var response = {};

        // Check to see if we've already enrolled the user.
        const userExists = await wallet.exists('notary');
        if (!userExists) {
            console.log('An identity for the user "notary" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return ({Error : 'An identity for the user "notary" does not exist in the wallet and Run the registerUser.js application before retrying'});
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'notary', discovery: { enabled: false } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('veritable-channel');

        // Get the contract from the network.
        const contract = network.getContract('veritable');

        // Submit the specified transaction.
        const result = await contract.submitTransaction('encodeAndStoreUserData', appId, first_name, last_name, username, phone,notary_license_number);
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
        // Disconnect from the gateway.
        await gateway.disconnect();
        return result

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        response.error = error.message;
        return response;
    }
}
/***********************************INVOKE CHAINCODE TO STORE BUYER DATA**********************************/
exports.putPartiesData = async function(appId,partiesId,first_name,last_name,emailid) {
    try {

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);
        var response = {};

        // Check to see if we've already enrolled the user.
        const userExists = await wallet.exists('parties');
        if (!userExists) {
            console.log('An identity for the user "parties" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return ({Error : 'An identity for the user "parties" does not exist in the wallet and Run the registerUser.js application before retrying'});
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'parties', discovery: { enabled: false } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('veritable-channel');

        // Get the contract from the network.
        const contract = network.getContract('veritable');

        // Submit the specified transaction.
        const result = await contract.submitTransaction('partiesdata', appId,partiesId,first_name,last_name,emailid);
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
        // Disconnect from the gateway.
        await gateway.disconnect();
        return result

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        response.error = error.message;
        return response;
    }
}

/***********************************INVOKE CHAINCODE TO STORE SELLER DATA**********************************/
exports.putClientData = async function(appId,clientId,first_name,last_name,emailid) {
    try {

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);
        var response = {};

        // Check to see if we've already enrolled the user.
        const userExists = await wallet.exists('client');
        if (!userExists) {
            console.log('An identity for the user "client" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return ({Error : 'An identity for the user "client" does not exist in the wallet and Run the registerUser.js application before retrying'});
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'client', discovery: { enabled: false } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('veritable-channel');

        // Get the contract from the network.
        const contract = network.getContract('veritable');

        // Submit the specified transaction.
        const result = await contract.submitTransaction('clientdata', appId,clientId,first_name,last_name,emailid);
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
        // Disconnect from the gateway.
        await gateway.disconnect();
        return result

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        response.error = error.message;
        return response;
    }
}
/**************************************INVOKE ATTACH BUYER DOCUMENTS*****************************************************/
exports.attachpartiesDocuments = async function(appId,partiesId,passport,driving_license,passportcard,work_permit,residence_permit,visa,nic) {
    try {

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);
        var response = {};

        // Check to see if we've already enrolled the user.
        const userExists = await wallet.exists('parties');
        if (!userExists) {
            console.log('An identity for the user "parties" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return ({Error : 'An identity for the user "parties" does not exist in the wallet and Run the registerUser.js application before retrying'});
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'parties', discovery: { enabled: false } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('veritable-channel');

        // Get the contract from the network.
        const contract = network.getContract('veritable');

        // Submit the specified transaction.
        const result = await contract.submitTransaction('attachpartiesDocuments', appId,partiesId,passport,driving_license,passportcard,work_permit,residence_permit,visa,nic);
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
        // Disconnect from the gateway.
        await gateway.disconnect();
        return result

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        response.error = error.message;
        return response;
    }
}
/**************************************INVOKE ATTACH SELLER DOCUMENTS*********************************************************/
exports.attachclientDocuments = async function(appId,clientId,passport,driving_license,passportcard,work_permit,residence_permit,visa,nic) {
    try {

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);
        var response = {};

        // Check to see if we've already enrolled the user.
        const userExists = await wallet.exists('client');
        if (!userExists) {
            console.log('An identity for the user "client" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return ({Error : 'An identity for the user "client" does not exist in the wallet and Run the registerUser.js application before retrying'});
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'client', discovery: { enabled: false } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('veritable-channel');

        // Get the contract from the network.
        const contract = network.getContract('veritable');

        // Submit the specified transaction.
        const result = await contract.submitTransaction('attachclientDocuments', appId,clientId,passport,driving_license,passportcard,work_permit,residence_permit,visa,nic);
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
        // Disconnect from the gateway.
        await gateway.disconnect();
        return result

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        response.error = error.message;
        return response;
    }
}
/*********************************************Add witness data for Client ibto Blockchain**************************/
exports.clientWitness = async function(appId,clientId,witnessId,first_name,last_name,emailid) {
    try {

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);
        var response = {};

        // Check to see if we've already enrolled the user.
        const userExists = await wallet.exists('notary');
        if (!userExists) {
            console.log('An identity for the user "notary" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return ({Error : 'An identity for the user "notary" does not exist in the wallet and Run the registerUser.js application before retrying'});
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'notary', discovery: { enabled: false } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('veritable-channel');

        // Get the contract from the network.
        const contract = network.getContract('veritable');

        // Submit the specified transaction.
        const result = await contract.submitTransaction('clientWitness', appId,clientId,witnessId,first_name,last_name,emailid);
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
        // Disconnect from the gateway.
        await gateway.disconnect();
        return result

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        response.error = error.message;
        return response;
    }
}
/*********************************************Add witness data for Parties ibto Blockchain********************************/
exports.partiesWitness = async function(appId,partiesId,witnessId,first_name,last_name,emailid) {
    try {

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);
        var response = {};

        // Check to see if we've already enrolled the user.
        const userExists = await wallet.exists('notary');
        if (!userExists) {
            console.log('An identity for the user "notary" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return ({Error : 'An identity for the user "notary" does not exist in the wallet and Run the registerUser.js application before retrying'});
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'notary', discovery: { enabled: false } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('veritable-channel');

        // Get the contract from the network.
        const contract = network.getContract('veritable');

        // Submit the specified transaction.
        const result = await contract.submitTransaction('partiesWitness', appId,partiesId,witnessId,first_name,last_name,emailid);
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
        // Disconnect from the gateway.
        await gateway.disconnect();
        return result

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        response.error = error.message;
        return response;
    }
}
/*********************************************INVOKE Client data and mapp to notary*************************************/
exports.addClientData = async function(appId,scan_Reference_Number,first_name,last_name,emailid,phone) {
    try {

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);
        var response = {};

        // Check to see if we've already enrolled the user.
        const userExists = await wallet.exists('notary');
        if (!userExists) {
            console.log('An identity for the user "notary" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return ({Error : 'An identity for the user "notary" does not exist in the wallet and Run the registerUser.js application before retrying'});
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'notary', discovery: { enabled: false } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('veritable-channel');

        // Get the contract from the network.
        const contract = network.getContract('veritable');

        // Submit the specified transaction.
        const result = await contract.submitTransaction('addClientData', appId,scan_Reference_Number,first_name,last_name,emailid,phone);
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
        // Disconnect from the gateway.
        await gateway.disconnect();
        return result

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        response.error = error.message;
        return response;
    }
}
/*********************************************QUERY CHAINCODE to get all notary data*************************************/
exports.getpartiesData = async function(partiesId) {
    try {

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);
        var response = {};

        // Check to see if we've already enrolled the user.
        const userExists = await wallet.exists('parties');
        if (!userExists) {
            console.log('An identity for the user "parties" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return ({Error : 'An identity for the user "parties" does not exist in the wallet and Run the registerUser.js application before retrying'});
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'parties', discovery: { enabled: false } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('veritable-channel');

        // Get the contract from the network.
        const contract = network.getContract('veritable');

        // Evaluate the specified transaction.
        // queryCar transaction - requires 1 argument, ex: ('queryCar', 'CAR4')
        // queryAllCars transaction - requires no arguments, ex: ('queryAllCars')
        const result = await contract.evaluateTransaction('getpartiesData',partiesId);
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
        return result;

    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        response.error = error.message;
        return response;
    }
}

/*******************************QUERY method to get parties data*******************************************************/
exports.getclientData = async function(clientId) {
    try {

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);
        var response = {};

        // Check to see if we've already enrolled the user.
        const userExists = await wallet.exists('client');
        if (!userExists) {
            console.log('An identity for the user "client" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return ({Error : 'An identity for the user "client" does not exist in the wallet and Run the registerUser.js application before retrying'});
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'client', discovery: { enabled: false } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('veritable-channel');

        // Get the contract from the network.
        const contract = network.getContract('veritable');

        // Evaluate the specified transaction.
        // queryCar transaction - requires 1 argument, ex: ('queryCar', 'CAR4')
        // queryAllCars transaction - requires no arguments, ex: ('queryAllCars')
        const result = await contract.evaluateTransaction('getclientData',clientId);
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
        return result;

    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        response.error = error.message;
        return response;
    }
}
/*******************************QUERY method to get client data*******************************************************/
exports.getclientData = async function(appId) {
    try {

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);
        var response = {};

        // Check to see if we've already enrolled the user.
        const userExists = await wallet.exists('notary');
        if (!userExists) {
            console.log('An identity for the user "notary" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return ({Error : 'An identity for the user "notary" does not exist in the wallet and Run the registerUser.js application before retrying'});
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'notary', discovery: { enabled: false } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('veritable-channel');

        const contract = network.getContract('veritable');

        const result = await contract.evaluateTransaction('getclientData',appId);
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
        return result;

    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        response.error = error.message;
        return response;
    }
}
/*******************************QUERY method to get client data*******************************************************/
exports.getAllData = async function(appId) {
    try {

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);
        var response = {};

        // Check to see if we've already enrolled the user.
        const userExists = await wallet.exists('notary');
        if (!userExists) {
            console.log('An identity for the user "notary" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return ({Error : 'An identity for the user "notary" does not exist in the wallet and Run the registerUser.js application before retrying'});
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'notary', discovery: { enabled: false } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('veritable-channel');

        const contract = network.getContract('veritable');

        const result = await contract.evaluateTransaction('getAllData',appId);
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
        return result;

    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        response.error = error.message;
        return response;
    }
}