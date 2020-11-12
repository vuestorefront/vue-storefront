const express = require('express');

const app = express();

const createApiMiddleware = (nuxtContainer, moduleOptions) => {
  app.use(express.json());

  if (moduleOptions.extendApi) {
    moduleOptions.extendApi(app);
  }

  return (register) => {
    register(app)

    nuxtContainer.addServerMiddleware({
      path: '/api',
      handler: app
    });

  }
};

module.exports = createApiMiddleware;
