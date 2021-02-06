const { createMemory } = require('@vue-storefront/core/server');
const { createServer } = require('@vue-storefront/middleware');

module.exports = function VueStorefrontMiddleware () {
  const { read } = createMemory(this.nuxt.options.buildDir + '/../');
  const integrations = read();
  const handler = createServer.bind(this)({ integrations });

  const serverMiddleware = {path: '/api', handler };

  this.addServerMiddleware(serverMiddleware);
};
