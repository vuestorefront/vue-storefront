import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import consola from 'consola';
import { MiddlewareConfig, ApiClientExtension, CustomQuery } from '@vue-storefront/core';
import { registerIntegrations } from './integrations';
import getAgnosticStatusCode from './helpers/getAgnosticStatusCode';
import http, { Server } from 'http';

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

function createServer (config: MiddlewareConfig): Server {
  consola.info('Middleware starting....');
  consola.info('Loading integrations...');

  const integrations = registerIntegrations(app, config.integrations);

  consola.success('Integrations loaded!');

  app.post('/:integrationName/:functionName', async (req: Request, res: Response) => {
    const { integrationName, functionName } = req.params as any as RequestParams;
    const { apiClient, configuration, extensions, customQueries } = integrations[integrationName];
    const middlewareContext: MiddlewareContext = { req, res, extensions, customQueries };
    const createApiClient = apiClient.createApiClient.bind({ middleware: middlewareContext });
    const apiClientInstance = createApiClient(configuration);
    const apiFunction = apiClientInstance.api[functionName];
    try {
      const platformResponse = await apiFunction(...req.body);

      res.send(platformResponse);
    } catch (error) {
      res.status(getAgnosticStatusCode(error));
      res.send(error);
    }
  });

  consola.success('Middleware created!');

  const server = http.createServer(app);

  // Setting keepAlive values to be higher than defaults of loadbalancer ones
  // ref: https://cloud.google.com/load-balancing/docs/l7-internal
  server.keepAliveTimeout = 610 * 1000;
  server.headersTimeout = 650 * 1000;

  return server;
}

export { createServer };
