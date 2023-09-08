import type { RequestHandler } from "express";
import { IntegrationsLoaded, MiddlewareContext } from "../../types";

export function prepareApiFunction(
  integrations: IntegrationsLoaded
): RequestHandler {
  return (req, res, next) => {
    const { integrationName, functionName } = req.params;

    if (!integrations || !integrations[integrationName]) {
      res.status(404);
      res.send(
        `"${integrationName}" integration is not configured. Please, check the request path or integration configuration.`
      );

      return;
    }

    const {
      apiClient,
      configuration,
      extensions,
      customQueries = {},
      initConfig,
    } = integrations[integrationName];

    const middlewareContext: MiddlewareContext = {
      req,
      res,
      extensions,
      customQueries,
    };

    const createApiClient = apiClient.createApiClient.bind({
      middleware: middlewareContext,
    });

    const apiClientInstance = createApiClient({
      ...configuration,
      ...initConfig,
    });

    const apiFunction = apiClientInstance.api[functionName];

    res.locals.apiFunction = apiFunction;

    next();
  };
}
