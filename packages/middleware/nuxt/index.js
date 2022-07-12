const { createServer } = require('@vue-storefront/middleware');
const cors = require('cors');
const helmet = require('helmet');
const consola = require('consola');

module.exports = async function VueStorefrontMiddleware(moduleOptions) {
  const apiPath = 'api';
  const options = {
    contentSecurityPolicy: false,
    crossOriginOpenerPolicy: false,
    crossOriginEmbedderPolicy: false,
    permittedCrossDomainPolicies: {
      permittedPolicies: 'none'
    },
    ...(moduleOptions.helmet || {})
  };
  // validate security setup with Helmet
  this.nuxt.hook('render:setupMiddleware', (app) => {
    app.use(cors());
    const isHelmetEnabled = moduleOptions.helmet === true || (moduleOptions.helmet && Object.keys(moduleOptions.helmet).length > 0);
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
      consola.fatal(
        'Nuxt wasn\'t able to fetch the middlewareUrl. Please follow the guide at https://docs.vuestorefront.io/v2/getting-started/configuration.html#nuxt-config-js to configure your nuxt.config.js'
      );
    }
  });

  const config = require(`${this.nuxt.options.rootDir}/middleware.config.js`);
  const handler = await createServer(config);
  const serverMiddleware = { path: `/${apiPath}`, handler };

  this.addServerMiddleware(serverMiddleware);
};
