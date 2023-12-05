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
      integrations,
      getApiClient: (integrationKey: string) => {
        if (!(integrationKey in integrations)) {
          const keys = Object.keys(integrations);
          throw new Error(
            `The specified integration key "${integrationKey}" was not found. Available integration keys are: ${keys}. Please ensure you're using the correct key or add the necessary integration configuration.`
          );
        }

        const {
          apiClient: innerApiClient,
          configuration: innerConfiguration,
          extensions: innerExtensions,
          customQueries: innerCustomQueries = {},
          initConfig: innerInitConfig,
        } = integrations[integrationKey];

        const innerMiddlewareContext: MiddlewareContext = {
          ...middlewareContext,
          extensions: innerExtensions,
          customQueries: innerCustomQueries,
        };

        const createInnerApiClient = innerApiClient.createApiClient.bind({
          middleware: innerMiddlewareContext,
        });

        const apiClientInstance = createInnerApiClient({
          ...innerConfiguration,
          ...innerInitConfig,
        });

        return apiClientInstance;
      },
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
