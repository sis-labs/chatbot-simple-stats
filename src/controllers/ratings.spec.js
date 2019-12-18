const sinon = require('sinon');

const { ratingsCreateHandler } = require('./ratings');

describe('ratings', () => {
  it('should create rating correctly', async () => {
    // GIVEN
    const config = {
      INDEX_NAME: 'test'
    };
    const esClient = {
      index: async () => (true)
    }
    const request = {
      log: {
        debug: sinon.spy(),
      }
    };
    const reply = {
      send: sinon.spy()
    };

    // WHEN
    const controller = ratingsCreateHandler({config, esClient});
    await controller(request, reply);

    // THEN
    sinon.assert.calledOnce(reply.send);
  });
});