const moment = require('moment-timezone');
const chai = require('chai');

const {
  getEsConfig,
  getDate,
} = require('./utils');

const {
  expect
} = chai;

describe('esConfig', () => {
  it('should setup config with authentication', () => {
    // GIVEN
    config = {
      ELASTIC_URL: 'http://localhost:9200',
      ELASTIC_USERNAME: 'elastic-username',
      ELASTIC_PASSWORD: 'elastic-passowrd'
    }

    // WHEN
    const esConfig = getEsConfig(config);

    // THEN
    expect(esConfig).not.null;
    expect(esConfig.auth).not.null;
  });

  it('should setup config without authentication (no username)', () => {
    // GIVEN
    config = {
      ELASTIC_URL: 'http://localhost:9200',
      ELASTIC_USERNAME: null,
      ELASTIC_PASSWORD: 'elastic-passowrd'
    }

    // WHEN
    const esConfig = getEsConfig(config);

    // THEN
    expect(esConfig).not.null;
    expect(esConfig.auth).undefined;
  });

  it('should setup config without authentication (no password)', () => {
    // GIVEN
    config = {
      ELASTIC_URL: 'http://localhost:9200',
      ELASTIC_USERNAME: 'elastic-username',
      ELASTIC_PASSWORD: null
    }

    // WHEN
    const esConfig = getEsConfig(config);

    // THEN
    expect(esConfig).not.null;
    expect(esConfig.auth).undefined;
  });
});

describe('getDate', () => {
  it('should provide the right date', (done) => {
    // GIVEN
    const timezone = 'Europe/Zurich';
    const start = moment().tz(timezone);
    const config = {
      SERVER_TIMEZONE: timezone,
    };
    setImmediate(() => {
      // WHEN
      const date = getDate(config);

      setTimeout(() => {
        // THEN
        const stop = moment().tz(timezone);
        expect(date.isBetween(start, stop)).to.be.true;
        done();
      }, 10);
    });
  });
});