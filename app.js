const express  = require('express');
const app = express();
const request = require('request');
const dotenv = require('dotenv').config();
const axios = require('axios');
const port = 3000;

app.set("view engine", "ejs"); 

app.use(express.static("public"));


app.get("/", (req, res) => {

    res.render("home");
}) 


app.get("/weather", async (req, res) => {

    const city = req.query.city;
    console.log(city);
    const APIURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.API_KEY}`;
     
    let weather;
    let error = null;

    try {
        const response = await axios.get(APIURL);
        weather = response.data;
    } catch (err) {
        weather = null;
        error = "City Not Found";
    }
   
    console.log(weather , error);
    res.render("index",{weather, error});

})




app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})




