const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');


const app = express();

dotenv.config();
const API_KEY = "e17cdab707ecc0ccd9598bc0b4b5a52e";

app.set('view engine', 'ejs'); 
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); 


// Enable logging
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    console.log(`${req.method} ${req.url}`);
    next();
  });

// Route to the EJS template
app.get('/', (req, res) => {
  res.render('app'); 
});


// Route to get weather information
app.get('/weather/:city', (req, res) => {
  const city = req.params.city;
  getWeatherData(city)
    .then((weatherData) => {
      res.json(weatherData);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Unable to get weather data.' });
    });
});


// Function to get weather data from OpenWeatherMap API
async  function getWeatherData(city) {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    return axios
      .get(url)
      .then((response) => response.data)
      .catch((error) => {
        throw error; 
      });
  }

const port = 4000;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
