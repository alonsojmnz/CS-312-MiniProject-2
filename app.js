// get express from library
const express = require('express')
// get app variable by calling express
const app = express()
// import axios
const axios = require('axios')
// set port number 
const PORT = 5000

// used to read JSON data from body of
// post request
app.use(express.json());

// set up EJS in express app.js
app.set('view engine', 'ejs')

// get method route
// that responds to a get / request
// with just loading the main page 
// of my web application
app.get('/', (req, res) => {
    res.render('index');
});

// post method route
// that handles when user's location is sent from browser to server
// server uses location to call weather api
// and gets information from the request body
// that should have geolocation information
// imperative towards making our api work
app.post('/weather', async (req, res) => {
    // get lat and long from request body
    const { latitude, longitude } = req.body; 

    // my api key
    const mykey = '96497ff0f3a98143a24638ae9394d93d';
    // create url var for openWeatherMap
    // and replace "params" with long lat and api key
    // in order to grab correct weather data
    const myurl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${mykey}&units=metric`;

    // use try catch for error handling
    try {
        // use url variable we made
        // and fetch weather data into
        // new info variable
        const info = await axios.get(myurl);
        // get data from the info variable we made
        // that contains API response
        const data = info.data;

        // Redirect to /displayinfo route, passing the weather data
        res.redirect(`/displayinfo?temp=${(data.main.temp * 9/5) + 32}&weather=${data.weather[0].description}&location=${data.name}`);
    } catch (error) {
        // if we were unable to reach the api for whatever reason
        // render an error message
        res.render('errrrrrrrrror', {message: 'Could not reach weather API data!'});
    }

});

// display weather information route
app.get('/displayinfo', (req, res) => {
    // extract temp weather and location from our req parameters
    const { temp, weather, location } = req.query;
    // render displayinfo page
    // passing in weather to be displayed
    res.render('displayinfo', { temp, weather, location });
});

// start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


