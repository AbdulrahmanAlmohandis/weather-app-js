
// Setup empty JS object to act as endpoint for all routes
projectData = {};

//API key is in server side to keep it secret
const api = 'ce0c8b18ddfe9e4707572b4f22e06479';

//HTTP for weather
let http = 'http://api.openweathermap.org/data/2.5/weather?zip=';

// Require Express to run server and routes, body parser, and node fetch to fetch data from API server
const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({
    extended: false 
}));
app.use(bodyParser.json());



// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
app.listen(8080, ()=>{
    console.log('Running!');
});

app.post('/postData', postData);

//Post data to the project endpoint
function postData(req, res){
    projectData = {
        temp: req.body.temp,
        weather: req.body.weather,
        description: req.body.description,
    }
}

//get data
app.get('/getData', (req, res)=>{
    res.send(projectData);
});