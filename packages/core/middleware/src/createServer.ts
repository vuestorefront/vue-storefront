import express, { Request, Response, Express } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import consola from 'consola';
import { MiddlewareConfig, ApiClientExtension, CustomQuery } from '@vue-storefront/core';
import { registerIntegrations } from './integrations';

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

interface MiddlewareContext {
  req: Request;
  res: Response;
  extensions: ApiClientExtension[];
  customQueries: Record<string, CustomQuery>;
}

interface RequestParams {
  integrationName: string;
  functionName: string;
}

function createServer (config: MiddlewareConfig): Express {
  consola.info('Middleware starting....');
  consola.info('Loading integartions...');

  const integrations = registerIntegrations(config.integrations);

  consola.success('Integrations loaded!');

  app.post('/:integrationName/:functionName', async (req: Request, res: Response) => {
    const { integrationName, functionName } = req.params as any as RequestParams;
    const { apiClient, configuration, extensions, customQueries } = integrations[integrationName];
    const middlewareContext: MiddlewareContext = { req, res, extensions, customQueries };
    const createApiClient = apiClient.createApiClient.bind({ middleware: middlewareContext });
    const apiClientInstance = createApiClient(configuration);
    const apiFunction = apiClientInstance.api[functionName];
    const platformResponse = await apiFunction(...req.body);

    res.send(platformResponse);
  });

  consola.success('Middleware created!');

  return app;
}

export { createServer };
