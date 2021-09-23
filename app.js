const express = require('express')
const app = express()
const port = 3000

let cities = {};
const getZip = async ()=>{
    cities = await fetch("https://swe432tomcat.herokuapp.com/zipLookup/zip=22033");
};
getZip();

//const cities = ["Fairfax", "Vienna", "Falls Church", "Arlington"];

const populations = [24019, 16489, 14128, 236842];

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/cities/:cityname', (req, res) => {
  return res.json(cities.filter)
})

app.get('/populations', (req, res) => {
  return res.json(populations)
})

module.exports = app;
