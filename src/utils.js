module.exports = {
  getEsConfig
};

function getEsConfig(config) {
  const esConfig = {
    url: new URL(config['ELASTIC_URL']),
  };
  if (config['ELASTIC_USERNAME'] && config['ELASTIC_PASSWORD']) {
    esConfig.auth = {
      username: config['ELASTIC_USERNAME'],
      password: config['ELASTIC_PASSWORD'],
    }
  }
  return esConfig;
}
