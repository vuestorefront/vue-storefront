import Middleware from './middleware'

Middleware['health-check'] = function ({ app, res }) {
  const currentPath = app.context.route.fullPath;
  if (currentPath === '/healthz') {
    res.end('ok');
  }
};
