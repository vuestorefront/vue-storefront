const { createServer } = require('./../lib/index.es');

module.exports = function VueStorefrontMiddleware () {
  const { integrations } = require(this.nuxt.options.rootDir + '/middleware.config.js');
  const handler = createServer({ integrations });
  const serverMiddleware = { path: '/api', handler };

  this.addServerMiddleware(serverMiddleware);
};
