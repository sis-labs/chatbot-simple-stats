const sinon = require('sinon');

const { homeHandler } = require('./home');

describe('home', () => {
  it('should handle home correctly', async () => {
    // GIVEN
    const request = {
      log: {
        debug: sinon.spy(),
      }
    };
    const reply = {
      send: sinon.spy()
    };

    // WHEN
    const controller = homeHandler();
    await controller(request, reply);

    // THEN
    sinon.assert.calledOnce(reply.send);
  });
});