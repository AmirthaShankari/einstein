var firebase = require("firebase-admin");
var serviceAccount = require("./firebase-admin-sdk.json");


var SAMPLE_SERVICE = require('./services/sampleService.js');

// Initialize Firebase
firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://medistos-2436e.firebaseio.com/"
});

var firebaseDB = firebase.database();

const express = require('express')
const bodyParser = require('body-parser');
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({extended:true}))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))


  .post('/test', function(req, res){
      return new Promise((resolve, reject) => {
          var id = req.body.id;
          console.log(id);
          // Call to your Service
          var data = SAMPLE_SERVICE.getTestData();
          
          // To send response back
          res.send(data);
          // To resolve the Promise
          resolve();
          
      }); 
  })



  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
