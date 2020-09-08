const fetch = require('node-fetch');

const getMyWeather = async (zipcode) => {
  let OpenWeatherAPIKey = '745af18b0ea3615649040c19beaba79f';
  const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${zipcode},&appid=${OpenWeatherAPIKey}`);
  const myJson = await response.json(); //extract JSON from the http response
  // do something with myJson
  console.log(myJson);
}

getMyWeather('75019')