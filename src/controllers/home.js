module.exports = {
    homeHandler
  }
  
  function homeHandler() {
    return async (request, reply) => {
      request.log.debug('handling a request on greetings controller');
      return reply.send({message: 'this is a test', code: 1});
    };
  }