'use strict';
const { Contract} = require('fabric-contract-api');
var base64 = require('base-64');
class fabricDrive extends Contract {

  async init(ctx) {
  
    console.log("<== veritable Chaincode==>");
    
     }

/*****************************Put method to store  notary data**********************/

     async encodeAndStoreUserData(ctx, notaryId, first_name,last_name,username,phone,notary_license_number) {
      console.info('============= START : mapp Notary user data to AppID ===========');
      let timeStamp= await ctx.stub.getTxTimestamp();
      const timestamp = new Date(timeStamp.getSeconds() * 1000).toISOString();
      let userAsBytes = await ctx.stub.getState(notaryId); 
      if (!userAsBytes || userAsBytes.toString().length <= 0) {

        let userDocs = {
          Notaryid:notaryId,
          First_name:first_name,
          Last_name:last_name,
          Username:username,
          Phone:phone,
          Notary_license_number:notary_license_number,
          Timestamp: timestamp,
          SignersData: [],
          clientdata:[],
          hash:""
        }
        let inputdata = JSON.stringify(userDocs);
        var encoded = base64.encode(inputdata);
        console.log(encoded);
        userDocs.hash = encoded;
      await ctx.stub.putState(notaryId, Buffer.from(JSON.stringify(userDocs)));
      console.info('============= END : notary data put into BLOCKCHAIN ===========');
      let response = {
        Notaryid: notaryId,
        Notary_license_number:notary_license_number,
        success : 'true',
        message : "Notary Details encoded and stored in Blockchain",
        Hash : userDocs.hash
      }
      return JSON.stringify(response);
    }
    else {
      return ({Error: "2020"});
    }
  }

/**********************PUT method to add clientData***************************************/

async clientdata(ctx,notaryId,clientId,first_name,last_name,emailid) {
  console.info('============= START : mapp partiess data to AppID ===========');
  let userAsBytes = await ctx.stub.getState(notaryId); 
  if (!userAsBytes || userAsBytes.toString().length <= 0){
    return({Error: "Incorrect notaryId..!"});
  }
  let clientAsBytes = await ctx.stub.getState(clientId);
  if (!clientAsBytes || clientAsBytes.toString().length <=0){
    let clientData = {
      Notaryid:notaryId,
      Type: 'client',
      ClientId:clientId,
      First_name:first_name,
      Last_name:last_name,
      Emailid:emailid,
      APN_number:'false',
      hash:"",
      Documents:[]
    }
  let inputdata = JSON.stringify(clientData);
  var encoded = base64.encode(inputdata);
  clientData.hash = encoded;
  let Clientinfo = JSON.parse(userAsBytes);
  Clientinfo.SignersData.length = 0;
  // var encoded = base64.encode(Sellerinfo);
  // Sellerinfo.SignersData[0].hash = encoded;
  Clientinfo.SignersData.push(clientData);
  await ctx.stub.putState(clientId, Buffer.from(JSON.stringify(Clientinfo)));
  // let SellerDataInfo = JSON.parse(userAsBytes);
  Clientinfo.SignersData.push(clientData);
  await ctx.stub.putState(notaryId, Buffer.from(JSON.stringify(Clientinfo)));
  console.info('============= END : client data put into BLOCKCHAIN ===========');
  let response = {
    Notaryid:notaryId,
    ClientId: clientId,
    hash: clientData.hash,
    success : 'true',
    message : clientId + " details stored in Blockchain"
  }
  return JSON.stringify(response);
}else {
  return ({Error: "2020"});
    }
  }
/**********************PUT method to add partiesData********************************************************************/
async partiesdata(ctx,notaryId,partiesId,first_name,last_name,emailid) {
  console.info('============= START : mapp partiess data to AppID ===========');
  let userAsBytes = await ctx.stub.getState(notaryId); 
  if (!userAsBytes || userAsBytes.toString().length <= 0){
    return({Error: "Incorrect notaryId..!"});
  }
  let partiesAsBytes = await ctx.stub.getState(partiesId);
  if (!partiesAsBytes || partiesAsBytes.toString().length <=0){
    let partiesData = {
      Notaryid:notaryId,
      Type: 'parties',
      PartiesId:partiesId,
      First_name:first_name,
      Last_name:last_name,
      Emailid:emailid,
      APN_number:'false',
      Status:'pending',
      hash:"",
      Documents:[]
    }
  let inputdata = JSON.stringify(partiesData);
  var encoded = base64.encode(inputdata);
  partiesData.hash = encoded;
  let Partiesinfo = JSON.parse((userAsBytes));
  Partiesinfo.SignersData.length = 0;
  // var encoded = base64.encode(Buyerinfo);
  // Buyerinfo.SignersData[0].hash = encoded;
  Partiesinfo.SignersData.push(partiesData);
  await ctx.stub.putState(partiesId, Buffer.from(JSON.stringify(Partiesinfo)));
  // let BuyerDataInfo = JSON.parse(userAsBytes);
  Partiesinfo.SignersData.push(partiesData);
  await ctx.stub.putState(notaryId, Buffer.from(JSON.stringify(Partiesinfo)));
  console.info('============= END : parties data put into BLOCKCHAIN ===========');
  let response = {
    Notaryid:notaryId,
    PartiesId: partiesId,
    hash: partiesData.hash,
    success : 'true',
    message : partiesId +" details stored in Blockchain"
  }
  return JSON.stringify(response);
}else {
  return ({Error: "2020"});
    }
  }
/*****************************PUT APN data into Blockchain************************************************************/
async attachAPNDocuments(ctx,notaryId,clientId,document_type,document_name,apn_number) {
  console.info('============= START : mapp client documents to clientid ===========');
  let userAsBytes = await ctx.stub.getState(notaryId); 
  if (!userAsBytes || userAsBytes.toString().length <= 0){
    return({Error: "Incorrect notaryId..!"});
  }
  let clientAsBytes = await ctx.stub.getState(clientId);
  if (!clientAsBytes || clientAsBytes.toString().length <= 0) {
    return({Error: "Incorrect Seller Id..!"});
  } 
  let check = JSON.parse(clientAsBytes);
  if(check.SignersData[0].Type!== 'client'){
    return({Error: check.SignersData[0].ClientId + " is not client"})
  }
  if(check.SignersData[0].APN_number== apn_number){
  return({Error: check.SignersData[0].ClientId + " details already uploaded..!"})
  }
   else {
    let apnData = {
      Notaryid:notaryId,
      ClientId:clientId,
      Document_type: document_type,
      Document_name: document_name,
      APN_number: apn_number,
      Status:"pending"
    } 
  check.SignersData[0].APN_number = apn_number;
  await ctx.stub.putState(clientId, Buffer.from(JSON.stringify(check)));
  check.SignersData[0].Documents.push(apnData);
  await ctx.stub.putState(clientId, Buffer.from(JSON.stringify(check)));
  let Client = JSON.parse(userAsBytes);
  Client.SignersData[0].Documents.push(apnData);
  await ctx.stub.putState(notaryId, Buffer.from(JSON.stringify(Client)));
  console.info('============= END : APN documents into BLOCKCHAIN ===========');
  let response = {
    Notaryid:notaryId,
    ClientId:clientId,
    success : 'true',
    message : apnData.APN_number + " document stored in Blockchain"
  }
    return JSON.stringify(response);
}
}
/*****************************PUT METHOD TO ADD Seller's DOCUMENTS*****************************************************/
    async attachclientDocuments(ctx,notaryId,clientId,apn_number,passport,driving_license,passportcard,work_permit,residence_permit,visa,nic) {
      console.info('============= START : mapp client documents to clientid ===========');
      let userAsBytes = await ctx.stub.getState(notaryId); 
      if (!userAsBytes || userAsBytes.toString().length <= 0){
        return({Error: "Incorrect notaryId..!"});
      }
      let clientAsBytes = await ctx.stub.getState(clientId);
      if (!clientAsBytes || clientAsBytes.toString().length <= 0) {
        return({Error: "Incorrect clientId..!"});
      } 
      let check1 = JSON.parse(clientAsBytes);  
      if(check1.SignersData[0].Type!== 'client'){
        return({Error: check1.SignersData[0].ClientId + " is not client..!"});
      }
      if(check1.SignersData[0].Documents[0].Status== 'sold'){
        return({Error: check1.SignersData[0].ClientId + " not Authorised for " + check1.SignersData[0].Documents[0].APN_number})
      }
      if(check1.SignersData[0].Documents[0].APN_number!== apn_number){
        return({Error: " Please enter correct APN number "})
      }
      else {
        let documentData = {
          Notaryid:notaryId,
          ClientId:clientId,
          Passport : passport,
          Driving_license: driving_license,
          Passportcard: passportcard,
          Work_permit: work_permit,
          Residence_permit: residence_permit,
          Visa:visa,
          Nic:nic
        }
      check1.SignersData[0].Documents[0].Status = 'sold';
      await ctx.stub.putState(clientId, Buffer.from(JSON.stringify(check1)));
      check1.SignersData[0].Documents.push(documentData);
      await ctx.stub.putState(clientId, Buffer.from(JSON.stringify(check1)));
      let Seller = JSON.parse(userAsBytes);
      Seller.SignersData[0].Documents.push(documentData);
      await ctx.stub.putState(notaryId, Buffer.from(JSON.stringify(Seller)));
      console.info('============= END : clientsdocuments into BLOCKCHAIN ===========');
      let response = {
        Notaryid:check1.Notaryid,
        ClientId:documentData.clientId,
        success : 'true',
        message : documentData.clientId + " documents stored in Blockchain"
      }
      return JSON.stringify(response);
      }
  }
/*****************************PUT METHOD TO ADD Buyer's DOCUMENTS*****************************************************/
async attachpartiesDocuments(ctx,notaryId,partiesId,clientId,passport,driving_license,passportcard,work_permit,residence_permit,visa,nic) {
  console.info('============= START : mapp buer documents to partiesid ===========');
  let userAsBytes = await ctx.stub.getState(notaryId); 
  if (!userAsBytes || userAsBytes.toString().length <= 0){
    return({Error: "Incorrect notaryId..!"});
  }
  let partiesAsBytes = await ctx.stub.getState(partiesId); 
  if (!partiesAsBytes || partiesAsBytes.toString().length <= 0) {
    return({Error: "Incorrect partiesId..!"});
  }
  let clientAsBytes = await ctx.stub.getState(clientId);
  let client = JSON.parse(clientAsBytes)
  let parties = JSON.parse(partiesAsBytes);
  // var parties = 'parties';
  // for (i = 0; i < check.partiesdata.length; i++) {
  if(parties.SignersData[0].Type!== 'parties'){
    return({Error: "Please enter correct partiesId..!"})
  }
  if(parties.SignersData[0].Status== 'completed'){
    return({Error: partiesId + ' details already uploaded into Blockchain'})
  }
  else {
    let documentData = {
      Notaryid:notaryId,
      PartiesId:partiesId,
      APN_number: client.SignersData[0].Documents[0].APN_number,
      Passport : passport,
      Driving_license: driving_license,
      Passportcard: passportcard,
      Work_permit: work_permit,
      Residence_permit: residence_permit,
      Visa:visa,
      Nic:nic
    }
  parties.SignersData[0].Documents[0].Status = 'completed';
  await ctx.stub.putState(partiesId, Buffer.from(JSON.stringify(parties)));
  let Bdocument = JSON.parse(partiesAsBytes);
  Bdocument.SignersData[0].Documents.push(documentData);
  await ctx.stub.putState(partiesId, Buffer.from(JSON.stringify(Bdocument)));
  let Buyer = JSON.parse(userAsBytes);
  Buyer.SignersData[0].Documents.push(documentData);
  await ctx.stub.putState(notaryId, Buffer.from(JSON.stringify(Buyer)));
  console.info('============= END : partiesdocuments into BLOCKCHAIN ===========');
  let response = {
    Notaryid:check.Notaryid,
    PartiesId:documentData.PartiesId,
    success : 'true',
    message : documentData.PartiesId + " documents stored in Blockchain"
  }
  return JSON.stringify(response);
  } 
// }  return({Error: "Please enter correct partiesId..!"});
}
/********************ADD Witness for client****************************************************************/
async clientWitness(ctx,notaryId,clientId,witnessId,first_name,last_name,emailid) {
  console.info('============= START : mapp client documents to clientid ===========');
  let userAsBytes = await ctx.stub.getState(notaryId); 
  if (!userAsBytes || userAsBytes.toString().length <= 0){
    return({Error: "Incorrect notaryId..!"});
  }
  let clientAsBytes = await ctx.stub.getState(clientId);
  if (!clientAsBytes || clientAsBytes.toString().length <= 0) {
    return({Error: "Incorrect Id..!"});
  } 
  let client = JSON.parse(clientAsBytes);
  if(client.SignersData[0].Type!== 'client'){
    return ({Error: clientId + " is not client"})
  }else {

    let witnessData = {
      Notaryid:notaryId,
      ClientId:clientId,
      WitnessId:witnessId,
      First_name:first_name,
      Last_name:last_name,
      Emailid:emailid,
      hash:""
    }
  let inputdata = JSON.stringify(witnessData);
  var encoded = base64.encode(inputdata);
  witnessData.hash = encoded;
  let witnessSeller = JSON.parse(clientAsBytes);
  // var encoded = base64.encode(witnessBuyer);
  // witnessSeller.SignersData[0].hash = encoded;
  witnessSeller.SignersData.push(witnessData);
  await ctx.stub.putState(clientId, Buffer.from(JSON.stringify(witnessSeller)));
  let clientnotary = JSON.parse(userAsBytes);
  clientnotary.SignersData[0].Documents.push(witnessData);
  await ctx.stub.putState(notaryId, Buffer.from(JSON.stringify(clientnotary)));
  console.info('============= END : witness for parties stored  into BLOCKCHAIN ===========');
  let response = {
    Notaryid:notaryId,
    ClientId:clientId,
    WitnessId:witnessId,
    hash:witnessData.hash,
    success : 'true',
    message : "witness for  stored in Blockchain"
  }
  return JSON.stringify(response);
 } 
}
/********************ADD Witness for parties ***************************r***********************************/
async partiesWitness(ctx,notaryId,partiesId,witnessId,first_name,last_name,emailid) {
  console.info('============= START : mapp client documents to clientid ===========');
  let userAsBytes = await ctx.stub.getState(notaryId); 
  if (!userAsBytes || userAsBytes.toString().length <= 0){
    return({Error: "Incorrect notaryId..!"});
  }
  let partiesAsBytes = await ctx.stub.getState(partiesId);
  if (!partiesAsBytes || partiesAsBytes.toString().length <= 0) {
    return({Error: "Incorrect Id..!"});
  } 
  let parties = JSON.parse(partiesAsBytes);
  if(parties.SignersData[0].Type!== 'parties'){
    return ({Error: partiesId + " is not parties"})
  }else {
   let witnessData = {
    Notaryid:notaryId,
    PartiesId:partiesId,
    WitnessId:witnessId,
    First_name:first_name,
    Last_name:last_name,
    Emailid:emailid,
    hash:""
  }
  let inputdata = JSON.stringify(witnessData);
  var encoded = base64.encode(inputdata);
  witnessData.hash = encoded;
  let witnessBuyer = JSON.parse(partiesAsBytes);
  // var encoded = base64.encode(witnessBuyer);
  // witnessBuyer.SignersData[0].hash = encoded;
  witnessBuyer.SignersData.push(witnessData);
  await ctx.stub.putState(partiesId, Buffer.from(JSON.stringify(witnessBuyer)));
  let partiesnotary = JSON.parse(userAsBytes);
  partiesnotary.SignersData[0].Documents.push(witnessData);
  await ctx.stub.putState(notaryId, Buffer.from(JSON.stringify(partiesnotary)));
console.info('============= END : clientsdocuments into BLOCKCHAIN ===========');
let response = {
  Notaryid:notaryId,
  PartiesId:partiesId,
  WitnessId:witnessId,
  hash:witnessData.hash,
  success : 'true',
  message : "witness for stored in Blockchain"
}
return JSON.stringify(response);
 }
}
/********************************Clientdata********************************************/
async addClientData(ctx,notaryId,scan_Reference_Number,first_name,last_name,emailid,phone) {
  console.info('============= START : mapp partiess data to AppID ===========');
  let userAsBytes = await ctx.stub.getState(notaryId); 
  if (!userAsBytes || userAsBytes.toString().length <= 0){
    return({Error: "Incorrect notaryId..!"});
  }
    let clientData = {
      Notaryid:notaryId,
      Scan_Reference_Number:scan_Reference_Number,
      First_name:first_name,
      Last_name:last_name,
      Emailid:emailid,
      Phone:phone,
      hash:"",
    }
  let inputdata = JSON.stringify(clientData);
  var encoded = base64.encode(inputdata);
  clientData.hash = encoded;
  let clientDataInfo = JSON.parse(userAsBytes);
  clientDataInfo.clientdata.push(clientData);
  await ctx.stub.putState(notaryId, Buffer.from(JSON.stringify(clientDataInfo)));
  console.info('============= END : client data put into BLOCKCHAIN ===========');
  let response = {
    Notaryid:notaryId,
    hash: clientData.hash,
    success : 'true',
    message : " Client details stored in Blockchain"
  }
  return JSON.stringify(response);
  }

/***********************GET Method to get parties Data************************************/

async getpartiesData(ctx,partiesId) {
     
  let partiesAsBytes = await ctx.stub.getState(partiesId); 
  if (!partiesAsBytes || partiesAsBytes.toString().length <= 0) {
    return({Error: "Incorrect partiesId..!"});
    }
else {
  let partiesdata=JSON.parse(partiesAsBytes.toString());
    console.log(partiesdata.SignersData);
    return JSON.stringify(partiesdata.SignersData);
      }
    }
/****************************GET METHOD to get client data********************************/
  async getclientData(ctx,clientId) {
     
    let clientAsBytes = await ctx.stub.getState(clientId); 
    if (!clientAsBytes || clientAsBytes.toString().length <= 0) {
    return({Error: "Incorrect clientid..!"});
        }
    else {
    let clientdata=JSON.parse(clientAsBytes.toString());
    console.log(clientdata.SignersData);
    return JSON.stringify(clientdata.SignersData);
       }
     }
/***********************GET Method to get client Data************************************/

async getclientData(ctx,notaryId) {
     
  let userAsBytes = await ctx.stub.getState(notaryId); 
  if (!userAsBytes || userAsBytes.toString().length <= 0) {
    return({Error: "Incorrect notaryId..!"});
    }
else {
  let clientdata=JSON.parse(userAsBytes.toString());
    console.log(clientdata.clientdata);
    return JSON.stringify(clientdata.clientdata);
      }
    }
/*****************************GET Method to get All data*******************************/
    async getAllData(ctx,notaryId) {
   
    let userAsBytes = await ctx.stub.getState(notaryId); 
    if (!userAsBytes || userAsBytes.toString().length <= 0) {
      return({Error: "Incorrect Notaryid..!"});
          }
     else {
       let userDocs=JSON.parse(userAsBytes.toString());
       console.log(userDocs);
       return JSON.stringify(userDocs);
            }
        }
}

module.exports = fabricDrive;
