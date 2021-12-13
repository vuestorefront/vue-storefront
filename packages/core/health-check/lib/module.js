function handler (req, res) {
  res.end('ok')
};

module.exports = function healthCheckModule() {
  const serverMiddleware = { path: '/healthz', handler };

  this.addServerMiddleware(serverMiddleware);
};
