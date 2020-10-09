
import express from 'express';

const app = express();
app.use(express.json());

const extend = (fn) => fn(app);

const createMiddleware = (moduleOptions) => {
  if (moduleOptions.extendApi) {
    extend(moduleOptions.extendApi);
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
