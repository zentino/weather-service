'use strict';
const restify = require('restify');
const errors = require('restify-errors');
const port = process.env.PORT || 8080;
const controller = require('./weather.controller');

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
  controller.getCityById(req.params.city_id)
  res.send(200)
  return next();
});

server.get('/cities/:city_id/weather', (req, res, next) => {
  controller.getCityWeatherById(req.params.city_id)
  res.send(200)
  return next();
});

server.get('/cities', (req, res, next) => {
  const lat = req.query.lat;
  const lng = req.query.lng;
  controller.getAvailableCities(lat, lng)
  res.send(200)
  return next();
});

server.listen(port, () => {
  console.info(`REST-based weather service running on port ${port}`);
});
