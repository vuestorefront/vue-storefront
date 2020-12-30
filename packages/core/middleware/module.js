const createProxyMiddleware = require('./middleware');

module.exports = function VueStorefrontMiddleware (moduleOptions) {
  this.addServerMiddleware(createProxyMiddleware(moduleOptions, this.options));
};
