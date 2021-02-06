import express from 'express';
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json());
app.use(cookieParser());

const lookUpConfiguration = (integrationConfig, nuxtInstance) => {
  const integrationModule = nuxtInstance.options.buildModules.find(module =>
    Array.isArray(module) && module[0] === integrationConfig.modulePackage
  );

  return integrationModule ? integrationModule[1] : {};
};

const registerIntegrations = (integrations, nuxtInstance) =>
  Object.entries(integrations).reduce((prev, [tag, integrationConfig]: any) => {
    const { middleware, ...rest } = lookUpConfiguration(integrationConfig, nuxtInstance);
    const configuration = { ...rest, ...integrationConfig.configuration };
    const rawExtensions = [...middleware.extensions || [], ...integrationConfig.extensions || []];
    const extensions = rawExtensions.reduce((prev, curr) => {
      if (typeof curr === 'string') {
        console.log('loading...', curr);
        return [
          ...prev,
          ...require(curr).extensions
        ];
      }

      return [...prev, curr];
    }, []);

    return {
      ...prev,
      [tag]: {
        apiClient: require(integrationConfig.apiClientPackage),
        configuration,
        extensions
      }
    };
  }, {});

const getApiClient = (apiClientPackage, { req, res, extensions }) => {
  const context = { middleware: { req, res, extensions } };
  const createApiClient = apiClientPackage.createApiClient.bind(context);

  return { ...apiClientPackage, createApiClient };
};

function createServer (config) {
  const integrations = registerIntegrations(config.integrations, this);

  app.post('/:integrationName/:functionName', async (req, res) => {
    const { integrationName, functionName } = req.params;
    const { apiClient, configuration, extensions } = integrations[integrationName];
    const { createApiClient } = getApiClient(apiClient, { req, res, extensions });

    const apiClientInstance = createApiClient(configuration);
    const apiFunction = apiClientInstance.api[functionName];
    const platformResponse = await apiFunction(...req.body);

    res.send(platformResponse);
  });

  return app;
}

export { createServer };
