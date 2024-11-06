import { IntegrationsLoaded, MiddlewareContext } from "../../types";
import { getApiFunction } from "./getApiFunction";
import { getLogger, injectMetadata } from "../../logger";

export function prepareApiFunction(
  integrations: IntegrationsLoaded
): (req, res, next) => Promise<any> {
  return async (req, res, next) => {
    const { integrationName, extensionName, functionName } = req.params;

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
      const [fn, fnOrigin] = await getApiFunction(
        apiClientInstance,
        functionName,
        extensionName
      );
      res.locals.apiFunction = fn;
      res.locals.fnOrigin = fnOrigin;
    } catch (e) {
      if (e.errorBoundary) {
        const logger = injectMetadata(getLogger(res), () => ({
          alokai: {
            scope: {
              type: "endpoint" as const,
            },
            errorBoundary: e.errorBoundary,
          },
        }));
        logger.error(e);
      }
      res.status(404);
      res.send(e.message);

      return;
    }

    next();
  };
}
