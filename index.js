'use strict';
const restify = require('restify');
const port = process.env.PORT || 8080;

const server = restify.createServer({
  name: 'restify headstart'
});

server.listen(port, () => {
  console.info(`REST-based weather service running on port ${port}`);
})
