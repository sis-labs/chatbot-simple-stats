const { homeHandler, ratingsCreateHandler } = require('./controllers');

const routes = [
  {
    path: '/',
    method: 'get',
    handler: homeHandler,
  },
  {
    path: '/ratings',
    method: 'post',
    opts: {
      schema: {
        body: {
          type: 'object',
          properties: {
            conversationId: {
              type: 'string',
            },
            lang: {
              type: 'string',
              enum: ['fr', 'en', 'de', 'it'],
            },
            livechat: {
              type: 'number',
              minimum: 0,
              maximum: 1,
              default: 0,
            },
            timestamp: {
              // TODO(mlefebvre): add information about the type (date ISO8601)
              type: 'string',
            },
            rating: {
              type: 'number',
              minimum: 0,
              maximum: 5,
            }
          }
        }
      }
    },
    handler: ratingsCreateHandler,
  }
];

function setupRoutes(app, _routes, dependencies) {
  _routes.forEach(({path, method, handler, opts = {}}) => {
    app[method.toLowerCase()].call(app, path, opts, handler(dependencies));
  });
}

module.exports = {
  setupRoutes,
  routes,
}