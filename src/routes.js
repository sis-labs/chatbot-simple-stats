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
    handler: ratingsCreateHandler,
  }
];

function setupRoutes(app, _routes, dependencies) {
  _routes.forEach(({path, method, handler}) => {
    app[method.toLowerCase()].call(app, path, handler(dependencies));
  });
}

module.exports = {
  setupRoutes,
  routes,
}