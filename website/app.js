/* Global Variables */
const serverport = 3000;
const serverURLroot = `http://localhost:${serverport}`;
const OpenWeatherAPIKey = '745af18b0ea3615649040c19beaba79f'; // Personal API Key for OpenWeatherMap API
const openWeatherBaseURL = 'http://api.openweathermap.org/data/2.5/weather';
const userZip = document.getElementById('zip');
const userFeelings = document.getElementById('feelings')

// Create a new date instance dynamically with JS
let d = new Date();
let currentDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Event listener to add function to existing HTML DOM element
document.getElementById("generate").addEventListener("click", userAdd);

/* Function called by event listener */
function userAdd() {  // proper chaining is very important here or your results will be out of sync
  weatherForZip(`${openWeatherBaseURL}?zip=${userZip.value},&appid=${OpenWeatherAPIKey}`)
    .then(function(data) { // seems to be required for nested promises and exposing data in this fashion
      // console.log('WeatherData = ', data.main.temp);
      postData(`${serverURLroot}/add`, {temperature: data.main.temp, date: currentDate, userResponse: userFeelings.value});
    })
    .then(() => UpdatePage()); // the arrow function syntax is required - breaks chain otherwise
};

// get the weather info for zip
const weatherForZip = async (url='') => {
  console.log('Requesting Weather');
  const response = await fetch(url);
  // console.log('response', response);
  try {
    weatherData = await response.json();
    console.log('Returned Weather Data obj = ', weatherData);
    return weatherData;
  }
  catch(error) {
    console.log('ERROR weatherForZip(): ', error);
    // Log and carry on
  };
};

/* Function to POST data to server */
const postData = async (url='', data = {})=>{
  console.log('POSTING: ', JSON.stringify(data));
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    // don't care about the response in this scenario so carry on
  }catch(error) {
    console.log('ERROR POST: ', error);
    // log error and carry on
  }
};

/* GET Project Data from server and update the page */
const UpdatePage = async () => {
  // console.log('Update Page start');
  const request = await fetch(`${serverURLroot}/all`);
  try {
    const allData = await request.json();
    console.log('Update Page with: ', allData);
    document.getElementById('temp').innerHTML = `Temperature: ${allData.temperature}`;
    document.getElementById('date').innerHTML = `Date: ${allData.date}`;
    document.getElementById('content').innerHTML = `User Feelings: ${allData.userResponse}`;
  }
  catch(error) {
    console.log('ERROR: UpdatePage(): ', error);
    // log and carry on
  };
};

// Debug testing

/* Function to GET Web API Data*/
// see https://openweathermap.org/current for more information
/*
const fetch = require('node-fetch'); // fetch needed

const getMyWeather = async () => {
  const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${zipcode},&appid=${OpenWeatherAPIKey}`);
  const myJson = await response.json(); //extract JSON from the http response
  console.log(myJson);
}

getMyWeather(); */