const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cookieParser());

function getIntegrationConfigFromModule (moduleName, nuxtOptions) {
  const integrationModule = nuxtOptions.buildModules.find(module =>
    Array.isArray(module) && module[0] === moduleName
  );

  return integrationModule ? integrationModule[1] : {};
}

function loadApiClient (apiClientPackageName, { req, res }) {
  const apiClientPackage = require(apiClientPackageName);
  const context = { middleware: { req, res } };
  const createApiClient = apiClientPackage.createApiClient.bind(context);

  return { ...apiClientPackage, createApiClient };
}

function createProxyMiddleware (moduleOptions, nuxtOptions) {
  app.post('/:integrationName/:functionName', async (req, res) => {
    const { integrationName, functionName } = req.params;
    const integration = moduleOptions.integrations[integrationName];

    const initialConifguration = getIntegrationConfigFromModule(integration.module, nuxtOptions);

    const { createApiClient } = loadApiClient(integration.api, { req, res });

    const apiClient = createApiClient({
      ...initialConifguration,
      locale: 'en',
      country: 'US',
      currency: 'USD'
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

