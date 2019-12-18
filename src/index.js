require('dotenv').config();
const Fastify = require('fastify');

const { Client } = require('@elastic/elasticsearch')

const  { setupLogging } = require('./logging');
const { setupRoutes, routes } = require('./routes');
const { setupServer, startThunk } = require('./server');

let config = process.env;

const loggingConfig = setupLogging(config);

const esClient = new Client({ node: {
  url: new URL(config['ELASTIC_URL']),
  auth: {
    username: config['ELASTIC_USERNAME'],
    password: config['ELASTIC_PASSWORD'],
  },
} })

const server = setupServer({setupRoutes, Fastify, routes, ...config, loggingConfig, dependencies: {config, esClient}});
const close = startThunk({server, ...config})();

// exports due to ability to test
module.exports = {
  server,
  close,
  startThunk,
}
