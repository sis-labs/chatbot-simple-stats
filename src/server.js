function setupServer({routes, Fastify, logConfig, setupRoutes, config, dependencies}) {
    const server = Fastify(logConfig);
    setupRoutes(server, routes, {config, ...dependencies});
  
    server.addHook('onRequest', async (request, reply) => {
      console.log(request.headers);
      const {method, body} = request;
      if(method && method.toLowerCase() === 'post') {
        console.log(body);
      }
      return;
    });
  
    server.addHook('onError', async (request, reply, error) => {
      console.log(error);
    });
  
    return server;
  }
  
  const startThunk = ({server, HOST, PORT}) => {
    return async () => {
      try {
        await server.listen(PORT, HOST);
        const {address, port} = server.server.address();
        server.log.info({address, port}, `Server started on ${address}:${port}`);
        return server.close;
      } catch(err) {
        server.log.error({err}, `Unable to start the server: ${err.message || err}`);
        return () => {};
      }
    };
  };
  
  module.exports = {
    setupServer,
    startThunk,
  }
  