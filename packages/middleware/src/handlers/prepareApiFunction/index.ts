import { IntegrationsLoaded, MiddlewareContext } from "../../types";
import { getApiFunction } from "./getApiFunction";

export function prepareApiFunction(
  integrations: IntegrationsLoaded
): (req, res, next) => Promise<any> {
  return async (req, res, next) => {
    const { integrationName, extensionName, functionName } = req.params;

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

    // Pick the function from the namespaced if it exists, otherwise pick it from the shared integration
    try {
      res.locals.apiFunction = await getApiFunction(
        apiClientInstance,
        functionName,
        extensionName
      );
    } catch (e) {
      res.status(404);
      res.send(e.message);

      return;
    }

    next();
  };
}
