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
app.disable('x-powered-by');

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
  helmet?: boolean | HelmetOptions;
}

async function createServer(config: MiddlewareConfig): Promise<Express> {
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
  const integrations = await registerIntegrations(app, config.integrations);
  consola.success('Integrations loaded!');

  app.post('/:integrationName/:functionName', async (req: Request, res: Response) => {
    const { integrationName, functionName } = req.params as any as RequestParams;

    if (!integrations[integrationName]) {
      const errMsg = `"${integrationName}" integration is not configured. Please, check the request path or integration configuration.`;

      res.status(404);
      res.send(errMsg);

      return;
    }

    const { apiClient, configuration, extensions, customQueries, initConfig } = integrations[integrationName];
    const middlewareContext: MiddlewareContext = { req, res, extensions, customQueries };
    const createApiClient = apiClient.createApiClient.bind({ middleware: middlewareContext });
    const apiClientInstance = createApiClient({ ...configuration, ...initConfig });
    const apiFunction = apiClientInstance.api[functionName];

    try {
      if (!(Symbol.iterator in Object(req.body))) req.body = [req.body];
      const platformResponse = await apiFunction(...req.body);
      res.send(platformResponse);
    } catch (error) {
      consola.error(error);
      const status = getAgnosticStatusCode(error);
      res.status(status);
      if (status < 500) {
        /**
         * For all 4xx error codes or client error codes we wanted to send the error message
         */
        res.send(error);
      } else {
        /**
         * For all other error codes we wanted to send a generic error message
         */
        res.send(
          "ServerError: Something went wrong. Please, check the logs for more details."
        );
      }
    }
  });

  consola.success('Middleware created!');
  return app;
}

export { createServer };
