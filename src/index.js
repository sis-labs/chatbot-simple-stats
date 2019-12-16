require('dotenv').config();
const Fastify = require('fastify');

const  { setupLogging } = require('./logging');
const { setupRoutes, routes } = require('./routes');
const { setupServer, startThunk } = require('./server');

let config = process.env;
const loggingConfig = setupLogging(config);
const server = setupServer({setupRoutes, Fastify, routes, ...config, loggingConfig});

const close = startThunk({server, ...config})();

// exports due to ability to test
module.exports = {
  server,
  close,
  startThunk,
}
