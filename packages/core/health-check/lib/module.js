function handler (req, res, next) {
  res.end('ok')
};

module.exports = function healthcheck() {
  const serverMiddleware = { path: 'healthz', handler };

  this.addServerMiddleware(serverMiddleware);
}
