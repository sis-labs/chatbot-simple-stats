module.exports = {
    setupLogging
  };
  
  // TODO: add all serializers
  
  function setupLogging ({LOG_LEVEL = 'info', LOG_FILE_LOCATION}) {
    return {
      logger: {
        level: LOG_LEVEL,
        file: LOG_FILE_LOCATION,
        serializers: {
          req(req) {
            const {method, url, headers, hostname, remoteAddress, remotePort} = req;
            return {
              method,
              url,
              headers,
              hostname,
              remoteAddress,
              remotePort,
            }
          }
        },
      }
    };
  }
  