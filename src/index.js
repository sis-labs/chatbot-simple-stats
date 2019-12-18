require('dotenv').config();
const Fastify = require('fastify');

const { Client } = require('@elastic/elasticsearch');

const { setupLogging } = require('./logging');
const { setupRoutes, routes } = require('./routes');
const { setupServer, startThunk } = require('./server');
const { esConfig } = require('./utils');

let config = process.env;

const loggingConfig = setupLogging(config);

const esConfig = getEsConfig();

const esClient = new Client({ node: esConfig })

const server = setupServer({setupRoutes, Fastify, routes, ...config, loggingConfig, dependencies: {config, esClient}});
const close = startThunk({server, ...config})();

// exports due to ability to test
module.exports = {
  server,
  close,
  startThunk,
}
