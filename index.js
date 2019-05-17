'use strict';
const restify = require('restify');
const port = process.env.PORT || 8080;

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
  res.send(200)
  return next();
});

server.get('/cities/:city_id/weather', (req, res, next) => {
  res.send(200)
  return next();
});

server.get('/cities', (req, res, next) => {
  res.send(200)
  return next();
});

server.listen(port, () => {
  console.info(`REST-based weather service running on port ${port}`);
});
