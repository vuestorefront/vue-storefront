import type { RequestHandler } from "express";
import { IntegrationsLoaded, MiddlewareContext } from "../../deprecated/types";

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
      getApiClient: (name: string) => {
        if (!integrations[name]) {
          throw new Error(
            `You're trying to access the "${name}" integration, however it has not been configured in the middleware.config.[js,ts] file.`
          );
        }

        return (integrations[name].apiClient.createApiClient as any)(
          middlewareContext,
          {
            ...integrations[name].configuration,
            ...integrations[name].initConfig,
          }
        );
      },
    };

    const apiClientInstance = apiClient.createApiClient(middlewareContext, {
      ...configuration,
      ...initConfig,
    });

    const apiFunction = apiClientInstance.api[functionName];

    res.locals.apiFunction = apiFunction;

    next();
  };
}
