'use strict';
const restify = require('restify');
const errors = require('restify-errors');
const port = process.env.PORT || 8080;
const controller = require('./weather.controller');

const request = require('request');
const appid = 'a56b0d9f78bcc1caae5cfcf223946d0a';
const url = 'http://api.openweathermap.org/data/2.5/weather?';

const server = restify.createServer({
  name: 'restify headstart'
});

// construct an object from the JSON string
server.use(restify.plugins.bodyParser());
server.use(restify.plugins.queryParser());

server.pre((req, res, next) => {
    console.info(`Method: ${req.method}, URL: ${req.url}`);
    return next();
});

server.get('/cities/:city_id', (req, res, next) => {
  let city = controller.getCityById(req.params.city_id);
  if(city) {
    city["lat"] = city.coord.lat;
    city["lng"] = city.coord.lon;
    delete city["coord"];
    delete city["country"];
    res.json(200, city);
  } else {
    res.json(404, {
      code:"NotFoundError",
      message:"not found"
    });
  }
  return next();
});

server.get('/cities/:city_id/weather', (req, res, next) => {
  request.get(url + `id=${req.params.city_id}&appid=${appid}`, (error, response, body)=>{
    if(response.statusCode == 200) {
      const weather = JSON.parse(body);
      res.json(200, weather);
    } else {
      res.json(404, {code: "NotFoundError", nessage: "city not found"});
    }
  });
  return next();
});

server.get('/cities', (req, res, next) => {
  const lat = req.query.lat;
  const lng = req.query.lng;
  if(lat && lng) {
    const cities = controller.getAvailableCities(lat, lng);
    res.json(200, cities);
  } else {
    res.json(400, {code:"BadRequestError", message:"lat/lng required"});
  }
  return next();
});

server.listen(port, () => {
  console.info(`REST-based weather service running on port ${port}`);
});
