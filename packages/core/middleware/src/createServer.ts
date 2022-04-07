import express, { Request, Response, Express } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import consola from 'consola';
import helmet, { HelmetOptions } from 'helmet';
import { MiddlewareConfig, ApiClientExtension, CustomQuery } from '@vue-storefront/core';
import { registerIntegrations } from './integrations';
import getAgnosticStatusCode from './helpers/getAgnosticStatusCode';

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
interface Helmet extends HelmetOptions {
  helmet?: boolean | HelmetOptions
}

function createServer (config: MiddlewareConfig): Express {
  consola.info('Middleware starting....');

  const options: Helmet = {
    contentSecurityPolicy: false,
    crossOriginOpenerPolicy: false,
    crossOriginEmbedderPolicy: false,
    permittedCrossDomainPolicies: {
      permittedPolicies: 'none'
    },
    ...(config.helmet || {}) as HelmetOptions
  };
  const isHelmetEnabled = config.helmet === true || (config.helmet && Object.keys(config.helmet).length > 0);
  if (isHelmetEnabled) {
    app.use(helmet(options));
    consola.info('VSF `Helmet` middleware added');
  }

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
  return app;
}

export { createServer };
