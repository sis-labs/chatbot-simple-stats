module.exports = {
    ratingsCreateHandler
  }
  
  function ratingsCreateHandler() {
    return async (request, reply) => {
      request.log.debug('handling a request on greetings controller');
      return reply.send({message: 'Create a rating', code: 1});
    };
  }