/* Global Variables */
const serverport = 3000;
const serverURLroot = `http://localhost:${serverport}`;
const OpenWeatherAPIKey = '745af18b0ea3615649040c19beaba79f'; // Personal API Key for OpenWeatherMap API
const openWeatherBaseURL = 'http://api.openweathermap.org/data/2.5/weather';
const userZip = document.getElementById('zip');
const userFeelings = document.getElementById('feelings')

// const { get } = require('http');

// Create a new date instance dynamically with JS
let d = new Date();
let currentDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Event listener to add function to existing HTML DOM element
document.getElementById("generate").addEventListener("click", userAdd);

/* Function called by event listener */
function userAdd() {
  weatherForZip(`${openWeatherBaseURL}?zip=${userZip.value},&appid=${OpenWeatherAPIKey}`)
    .then(postData(`${serverURLroot}/add`, {temperature: '300', date: currentDate, userResponse: userFeelings.value}))
      .then(UpdatePage());
};

/* function to get the weather data */
// get the weather info for zip
const weatherForZip = async (url='') =>{
  const response = await fetch(url);
  // console.log('response', response);
  try {
    // Transform into JSON
    weatherData = await response.json();
    // console.log('weatherData', weatherData);
  }
  catch(error) {
    console.log('ERROR useradd(): ', error);
    // Log and carry on
  };
};

/* Function to POST data to server */
const postData = async (url='', data = {})=>{
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });

  try {
    const newData = await response.json();
  }catch(error) {
    console.log('ERROR POST: ', error);
  }
};

/* GET Project Data from server and update the page */
const UpdatePage = async () => {
  const request = await fetch(`${serverURLroot}/all`);
  try {
    const allData = await request.json();
    console.log('allData: ', allData);
    console.log('Update Page with: ', allData);
    document.getElementById('temp').innerHTML = `<span class="entry-item">Temperature: </span>${allData.temperature}`;
    document.getElementById('date').innerHTML = `<span class="entry-item">Date: </span>${allData.date}`;
    document.getElementById('content').innerHTML = `<span class="entry-item">You feel: </span>${allData.userResponse}`;
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