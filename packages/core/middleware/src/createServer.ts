import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

const registerIntegrations = (integrations) =>
  Object.entries(integrations).reduce((prev, [tag, integrationConfig]: any) => {
    const rawExtensions = integrationConfig.extensions || [];
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
        configuration: integrationConfig.configuration,
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
  const integrations = registerIntegrations(config.integrations);

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
