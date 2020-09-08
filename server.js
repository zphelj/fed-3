// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const serverPort = 3000;

// Start up an instance of app
// See https://expressjs.com/en/4x/api.html for overview, API, etc.
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server and start a server
const appserver = app.listen(serverPort, () => {
  console.log(`Weather Journal app listening on port ${serverPort}`);
})

// Handle GET '/all'
app.get('/all', (req, res) => {
  console.log('GET ALL');
  res.send(JSON.stringify(projectData)); // FIX: Need to make sure response is JSON
});

function addPostData(req,res) {
  console.log('POST ADD:');
  projectData.temperature = req.body.temperature;
  projectData.date = req.body.date;
  projectData.userResponse = req.body.userResponse;
  res.send(projectData);
}

// Handle POST '/add'
app.post('/add', addPostData); // TODO: Convert to arrow?

// debug testing
app.get('/hello', (req, res) => {
  console.log(req);
});

// END