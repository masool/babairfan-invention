const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

var network = require('./fabric/network.js');

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())


// // Enroll Admin into the veritable blockchain

// app.post('/enrolladmin', (req, res) => { 
//   console.log(req.body);    
//       network.enrolAdmin(req.body.Orgname)
//       .then((response) => {
//         res.send(response)
//       });
//     })  

// // Register User into the veritable blockchain

// app.post('/registerUser', (req, res) => { 
//   console.log(req.body);    
//       network.registerUser(req.body.username)
//       .then((response) => {
//         res.send(response)
//       });
//     })  
    
// Chaincode endpoints start from here

app.post('/createNotaryData', (req, res) => { 
  console.log(req.body);    
      network.putNotaryuser(
        req.body.appId,
        req.body.first_name,
        req.body.last_name,
        req.body.username,
        req.body.phone,
        req.body.notary_license_number)
      .then((response) => {
        res.send(response)
      });
    })  

app.post('/PartiesData',(req,res) => {
  console.log(req.body);
     network.putPartiesData(
       req.body.appId,
       req.body.partiesId,
       req.body.first_name,
       req.body.last_name,
       req.body.emailid)
      .then((response) => {
        res.send(response)
      });
})

app.post('/ClientData',(req,res) => {
  console.log(req.body);
     network.putClientData(   
       req.body.appId,
       req.body.clientId,
       req.body.first_name,
       req.body.last_name,
       req.body.emailid)
      .then((response) => {
        res.send(response)
      });
})

app.post('/attach_Parties_documents',(req,res) => {
  console.log(req.body);
     network.attachpartiesDocuments(
      req.body.appId,
      req.body.partiesId,
      req.body.passport,
      req.body.driving_license,
      req.body.passportcard,
      req.body.work_permit,
      req.body.residence_permit,
      req.body.visa,
      req.body.nic)
      .then((response) => {
        res.send(response)
      });
})

app.post('/attach_Client_documents',(req,res) => {
  console.log(req.body);
     network.attachclientDocuments(
      req.body.appId,
      req.body.clientId,
      req.body.passport,
      req.body.driving_license,
      req.body.passportcard,
      req.body.work_permit,
      req.body.residence_permit,
      req.body.visa,
      req.body.nic)
      .then((response) => {
        res.send(response)
      });
})

app.post('/clientWitness',(req,res) => {
  console.log(req.body);
     network.clientWitness(
      req.body.appId,
      req.body.clientId,
      req.body.witnessId,
      req.body.first_name,
      req.body.last_name,
      req.body.emailid)
      .then((response) => {
        res.send(response)
      });
})

app.post('/partiesWitness',(req,res) => {
  console.log(req.body);
     network.partiesWitness(
      req.body.appId,
      req.body.partiesId,
      req.body.witnessId,
      req.body.first_name,
      req.body.last_name,
      req.body.emailid)
      .then((response) => {
        res.send(response)
      });
})

app.post('/addClientData',(req,res) => {
  console.log(req.body);
     network.addClientData(
      req.body.appId,
      req.body.scan_Reference_Number,
      req.body.first_name,
      req.body.last_name,
      req.body.emailid,
      req.body.phone)
      .then((response) => {
        res.send(response)
      });
})

app.get('/getPartiesdata', (req, res) => {
   console.log(req);
   network.getpartiesData(req.body.partiesId)
   .then((response) => {           
   res.send(response)
   console.log(response);
     });
  })

  app.get('/getClientData', (req, res) => {
    console.log(req);
    network.getclientData(req.body.clientId)
    .then((response) => {           
    res.send(response)
    console.log(response);
      });
   })

   app.get('/getclientData', (req, res) => {
    console.log(req);
    network.getclientData(req.body.appId)
      .then((response) => {           
         res.send(response)
         console.log(response);
        });
   })

app.get('/getAlldata', (req, res) => {
   console.log(req);
   network.getAllData(req.body.appId)
     .then((response) => {           
        res.send(response)
        console.log(response);
       });
  })

app.listen(process.env.PORT || 8081)
