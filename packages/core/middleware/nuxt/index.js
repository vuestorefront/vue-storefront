const { createServer } = require('@vue-storefront/middleware');
const helmet = require('helmet');
const consola = require('consola');

module.exports = function VueStorefrontMiddleware(moduleOptions) {
  const apiPath = 'api';
  const options = {
    contentSecurityPolicy: false,
    crossOriginOpenerPolicy: false,
    permittedCrossDomainPolicies: {
      permittedPolicies: 'none'
    },
    ...moduleOptions
  };
  // validate security setup with Helmet
  this.nuxt.hook('render:setupMiddleware', (app) => {
    const hasHelmetKey = Object.prototype.hasOwnProperty.call(options, 'enableHelmet');
    const isHelmetEnabled = hasHelmetKey ? options.enableHelmet : true;
    if (isHelmetEnabled) {
      app.use(helmet(options));
      consola.success('Nuxt `Helmet` middleware added');
    }
  });
  // validating Server URL
  this.nuxt.hook('listen', (server, { url }) => {
    try {
      if (!url) consola.fatal('Nuxt was\'t able to fetch your url.');
      if (!(this.options && this.options.publicRuntimeConfig && this.options.publicRuntimeConfig.middlewareUrl)) {
        Object.assign(this.options.publicRuntimeConfig, {
          ...this.options.publicRuntimeConfig,
          middlewareUrl: new URL(apiPath, url).toString()
        });
        consola.success('Applied middlewareUrl as ', this.options.publicRuntimeConfig.middlewareUrl);
      }
    } catch (error) {
      consola.warn(error);
      consola.fatal('Nuxt wasn\'t able to fetch the middlewareUrl. Please follow the guide at https://docs.vuestorefront.io/v2/getting-started/configuration.html#nuxt-config-js to configure your nuxt.config.js');
    }
  });

  const { integrations } = require(this.nuxt.options.rootDir + '/middleware.config.js');
  const handler = createServer({ integrations });
  const serverMiddleware = { path: `/${apiPath}`, handler };

  this.addServerMiddleware(serverMiddleware);
};
