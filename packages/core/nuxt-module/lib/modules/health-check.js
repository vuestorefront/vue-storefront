function handler (req, res, next) {
  res.end('ok')
}

module.exports = function VueStorefrontHealthCheckModule () {
  const serverMiddleware = { path: '/healthz', handler };

  this.addServerMiddleware(serverMiddleware);
};
