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

    res.locals.alokai.metadata = {
      ...res.locals?.alokai?.metadata,
      scope: {
        integrationName,
        functionName,
        ...(extensionName ? { extensionName } : {}),
      },
      // errorBoundary: {
      //   scope: {
      //     integrationName,
      //     functionName,
      //   },
      // },
    };

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
      integrationTag: integrationName,
      getApiClient: (integrationTag: string) => {
        if (!(integrationTag in integrations)) {
          const keys = Object.keys(integrations);
          throw new Error(
            `The specified integration key "${integrationTag}" was not found. Available integration keys are: ${keys}. Please ensure you're using the correct key or add the necessary integration configuration.`
          );
        }

        const {
          apiClient: innerApiClient,
          configuration: innerConfiguration,
          extensions: innerExtensions,
          customQueries: innerCustomQueries = {},
          initConfig: innerInitConfig,
        } = integrations[integrationTag];

        const innerMiddlewareContext: MiddlewareContext = {
          ...middlewareContext,
          integrationTag,
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
