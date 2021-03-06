var firebase = require("firebase-admin");
var serviceAccount = require("./firebase-admin-sdk.json");


var SAMPLE_SERVICE = require('./services/sampleService.js');
var EINSTEIN_ENGINE = require('./services/einsteinEngine.js');

// Initialize Firebase
firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://medistos-2436e.firebaseio.com/"
});

var MOCK_INPUTS = [
  "what is the speed taken to cover a distance of 200 km in time of 2 hours",
  "what is the speed taken to cover a distance of 200 km ",
  "2 hours",
  "In how much time can i reach a distance of 50 km travel at of 10 km per hour",
  "What should be the speed to cover in 500 km when traveled in 10 hours",
  "What is the area of circle with radius 5 meter",
  "What is the perimeter of square of side 5 meter",
  "what is the perimeter of rectangle of length 5 meter and width 6 meter",
  "what is the circumference of circle of radius 5 cm",
  "What is the power loss when voltage is 5 volts and current passed is 6 amp"
]

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

  .get('/execute', function(req, res){
    return new Promise((resolve, reject) => {
        // Call to your Service
        var request = MOCK_INPUTS[0];
        var data = EINSTEIN_ENGINE.execute(request);
        console.log(data);
        // var request = MOCK_INPUTS[2];
        // var data = EINSTEIN_ENGINE.execute(request);
        // console.log(data);
        // To send response back
        res.send(data);
        // To resolve the Promise
        resolve();
    }); 
  })

  .post('/execute', function(req, res){
    return new Promise((resolve, reject) => {
        // Call to your Service
        var request = req.body.q;
        var data = EINSTEIN_ENGINE.execute(request);
        console.log(data);
        res.send(data);
        resolve();
    }); 
  })


  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
