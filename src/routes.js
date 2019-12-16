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
            rating: {
              type: 'number',
              minimum: 0,
              maximum: 5
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