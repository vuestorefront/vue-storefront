import express, { json } from 'express';

const app = express();
app.use(json());

const extend = (fn) => fn(app);

const createMiddleware = ({ apiMiddleware }) => {
  if (apiMiddleware && apiMiddleware.extend) {
    extend(apiMiddleware.extend);
  }

  return {
    middleware: {
      path: '/api',
      handler: app
    },
    extend
  };
};

export { createMiddleware };
