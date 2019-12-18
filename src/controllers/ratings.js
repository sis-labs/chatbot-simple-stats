const uuid = require('uuid');

module.exports = {
  ratingsCreateHandler
}

function ratingsCreateHandler({ config, esClient }) {
  return async (request, reply) => {
    const rating = request.body;
    const id = uuid.v4();
    console.log(JSON.stringify(rating));
    await esClient.index({
      id,
      index: config['INDEX_NAME'],
      type: 'ratings',
      body: rating
    });
    request.log.debug('handling a request on greetings controller');
    return reply.send({ message: 'Create a rating', code: 1 });
  };
}