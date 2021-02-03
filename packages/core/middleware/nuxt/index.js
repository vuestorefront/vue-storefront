const createProxyEndpoint = require('./../middleware');

module.exports = function VueStorefrontMiddleware (moduleOptions) {
  this.addServerMiddleware(createProxyEndpoint(moduleOptions, this.options));
};
