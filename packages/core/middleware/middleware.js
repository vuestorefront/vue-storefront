const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cookieParser());

function createProxyMiddleware (moduleOptions, nuxtOptions) {
  app.post('/:integrationName/:functionName', async (req, res) => {
    const { integrationName, functionName } = req.params;
    const apiPackageName = moduleOptions.apiClient[integrationName];
    const modulePackageName = apiPackageName.replace('-api', '') + '/nuxt';

    const integrationModule = nuxtOptions.buildModules.find(module =>
      Array.isArray(module) && module[0] === modulePackageName
    );

    const integrationModuleConfiguration = integrationModule ? integrationModule[1] : {};

    const { createApiClient, middlewareExtensions } = require(moduleOptions.apiClient[integrationName] + '/direct');

    const extensions = middlewareExtensions
      // eslint-disable-next-line
      ? Object.entries(middlewareExtensions).map(([_, extensionFn]) => extensionFn(req, res))
      : [];

    const apiClient = createApiClient({
      ...integrationModuleConfiguration,
      locale: 'en',
      country: 'US',
      currency: 'USD',
      extensions
    });

    const apiFunction = apiClient.api[functionName];

    const platformResponse = await apiFunction(...req.body);

    res.send(platformResponse);
  });

  return {
    path: '/api',
    handler: app
  };
}

module.exports = createProxyMiddleware;

