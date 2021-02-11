import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import consola from 'consola';
import { registerIntegrations } from './integrations';

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

const applyMiddlewreContext = (createApiClient, { req, res, extensions }) => {
  const context = {
    middleware: { req, res, extensions }
  };

  return createApiClient.bind(context);
};

function createServer (config) {
  consola.info('Middleware starting....');
  consola.info('Loading integartions...');

  const integrations = registerIntegrations(config.integrations);
  consola.success('Integrations loaded!');

  app.post('/:integrationName/:functionName', async (req, res) => {
    const { integrationName, functionName } = req.params;
    const { apiClient, configuration, extensions } = integrations[integrationName];
    const middlewareContext = { req, res, extensions };
    const createApiClient = applyMiddlewreContext(apiClient.createApiClient, middlewareContext);
    const apiClientInstance = createApiClient(configuration);
    const apiFunction = apiClientInstance.api[functionName];
    const platformResponse = await apiFunction(...req.body);

    res.send(platformResponse);
  });

  consola.success('Middleware created!');

  return app;
}

export { createServer };
