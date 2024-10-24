import { LoggerInterface } from "@vue-storefront/logger";
import { injectMetadata, getLogger } from "../logger";
import { isFunction } from "../helpers";
import {
  ApiClientConfig,
  ApiClientExtension,
  ApiClientFactory,
  ApiClientFactoryParams,
  ApiMethods,
  ApplyingContextHooks,
  CallableContext,
  CreateApiClientFn,
  ExtensionHookWith,
  ExtensionWith,
  LogScope,
} from "../types";
import { applyContextToApi } from "./applyContextToApi";
import { markExtensionNameHelpers } from "./markExtensionNameHelpers";

/**
 * Utility function faciliating building Logger with injected metadata about currently called hook
 */
function injectHookMetadata(
  logger: LoggerInterface,
  {
    extensionName,
    hookName,
    integrationName,
    type = "requestHook",
  }: {
    extensionName?: string;
    hookName: LogScope["hookName"];
    type?: LogScope["type"];
    integrationName?: string;
  }
) {
  return injectMetadata(logger, (metadata) => ({
    ...metadata,
    scope: {
      ...metadata?.scope,
      hookName,
      type,
      ...(extensionName ? { extensionName } : {}),
      ...(integrationName ? { integrationName } : {}),
    },
  }));
}

async function injectHandlerErrorMetadata(
  fn: Function,
  args: any[],
  integrationName: string,
  hookName: LogScope["hookName"]
) {
  try {
    const response = await fn(...args);
    return response;
  } catch (err) {
    const errorBoundary: LogScope = {
      type: "endpoint" as const,
      integrationName,
      hookName,
    };

    if (!err.errorBoundary && markExtensionNameHelpers.has(fn)) {
      errorBoundary.extensionName = markExtensionNameHelpers.get(fn);
    }

    Object.assign(err, { errorBoundary });

    throw err;
  }
}

const apiClientFactory = <
  ALL_SETTINGS extends ApiClientConfig,
  ALL_FUNCTIONS extends ApiMethods
>(
  factoryParams: ApiClientFactoryParams<ALL_SETTINGS, ALL_FUNCTIONS>
): ApiClientFactory<any, ALL_FUNCTIONS> => {
  const resolveApi = async (api: any, settings: any) => {
    if (typeof api === "function") {
      return await api(settings);
    }

    return api ?? {};
  };

  const createApiClient: CreateApiClientFn<any, ALL_FUNCTIONS> =
    async function createApiClient(
      this: CallableContext<ALL_FUNCTIONS>,
      config,
      customApi: Record<string, any> = {}
    ) {
      const rawExtensions: ApiClientExtension<ALL_FUNCTIONS>[] =
        this?.middleware?.extensions || [];
      const logger = getLogger(this.middleware.res);

      const lifecycles = await Promise.all(
        rawExtensions
          .filter((extension): extension is ExtensionWith<"hooks"> =>
            isFunction(extension?.hooks)
          )
          .map(async ({ name, hooks }) => {
            // Attaching extension related metadata to the logger
            // We cannot assign it to res.locals as we would end up
            // with incorrect logger for hook functions (like beforeCreate)
            // in case of multiple extensions using hooks property
            const loggerWithMetadata = injectHookMetadata(logger, {
              hookName: "hooks",
              extensionName: name,
            });

            try {
              return {
                ...hooks(this?.middleware?.req, this?.middleware?.res, {
                  logger: loggerWithMetadata,
                }),
                name,
              };
            } catch (err) {
              const errorBoundary: LogScope = {
                type: "requestHook" as const,
                hookName: "hooks",
                extensionName: name,
                // functionName: callName, todo: HOW?
                integrationName: this?.middleware?.integrationTag,
              };

              Object.assign(err, { errorBoundary });

              throw err;
            }
          })
      );

      const _config = await lifecycles
        .filter((extension): extension is ExtensionHookWith<"beforeCreate"> =>
          isFunction(extension?.beforeCreate)
        )
        .reduce(async (configSoFar, extension) => {
          const resolvedConfig = await configSoFar;
          const loggerWithMetadata = injectHookMetadata(logger, {
            extensionName: extension.name,
            hookName: "beforeCreate",
          });
          try {
            return await extension.beforeCreate({
              configuration: resolvedConfig,
              logger: loggerWithMetadata,
            });
          } catch (err) {
            const errorBoundary: LogScope = {
              type: "requestHook" as const,
              hookName: "beforeCreate",
              extensionName: extension.name,
              // functionName: callName, todo: HOW?
              integrationName: this?.middleware?.integrationTag,
            };

            Object.assign(err, { errorBoundary });

            throw err;
          }
        }, Promise.resolve(config));

      const loggerWithMetadata = injectHookMetadata(logger, {
        hookName: "onCreate",
        integrationName: this.middleware?.integrationTag,
      });
      // TODO: Wrap onCreate
      const settings = factoryParams.onCreate
        ? await injectHandlerErrorMetadata(
            factoryParams.onCreate,
            [_config, { logger: loggerWithMetadata }],
            this.middleware?.integrationTag,
            "onCreate"
          )
        : { config, client: config.client };

      settings.config = await lifecycles
        .filter((extension): extension is ExtensionHookWith<"afterCreate"> =>
          isFunction(extension?.afterCreate)
        )
        .reduce(async (configSoFar, extension) => {
          const resolvedConfig = await configSoFar;
          const loggerWithMetadata = injectHookMetadata(logger, {
            extensionName: extension.name,
            hookName: "afterCreate",
          });
          try {
            return await extension.afterCreate({
              configuration: resolvedConfig,
              logger: loggerWithMetadata,
            });
          } catch (err) {
            const errorBoundary: LogScope = {
              type: "requestHook" as const,
              hookName: "afterCreate",
              extensionName: extension.name,
              // functionName: callName, todo: HOW?
              integrationName: this?.middleware?.integrationTag,
            };

            Object.assign(err, { errorBoundary });

            throw err;
          }
        }, Promise.resolve(settings.config));

      const extensionHooks: ApplyingContextHooks = {
        before: async (params) => {
          return await lifecycles
            .filter((extension): extension is ExtensionHookWith<"beforeCall"> =>
              isFunction(extension?.beforeCall)
            )
            .reduce(async (argsSoFar, extension) => {
              const resolvedArgs = await argsSoFar;
              const resolvedSettings = await settings;

              const loggerWithMetadata = injectHookMetadata(logger, {
                extensionName: extension.name,
                hookName: "beforeCall",
              });

              try {
                return extension.beforeCall({
                  ...params,
                  configuration: resolvedSettings.config,
                  args: resolvedArgs,
                  logger: loggerWithMetadata,
                });
              } catch (err) {
                const errorBoundary: LogScope = {
                  type: "requestHook" as const,
                  hookName: "beforeCall",
                  extensionName: extension.name,
                  functionName: params.callName,
                  integrationName: this?.middleware?.integrationTag,
                };

                Object.assign(err, { errorBoundary });

                throw err;
              }
            }, Promise.resolve(params.args));
        },
        after: async (params) => {
          return await lifecycles
            .filter((extension): extension is ExtensionHookWith<"afterCall"> =>
              isFunction(extension.afterCall)
            )
            .reduce(async (responseSoFar, extension) => {
              const resolvedResponse = await responseSoFar;
              const resolvedSettings = await settings;

              const loggerWithMetadata = injectHookMetadata(logger, {
                extensionName: extension.name,
                hookName: "afterCall",
              });

              try {
                return extension.afterCall({
                  ...params,
                  configuration: resolvedSettings.config,
                  response: resolvedResponse,
                  logger: loggerWithMetadata,
                });
              } catch (err) {
                const errorBoundary: LogScope = {
                  type: "requestHook" as const,
                  hookName: "afterCall",
                  extensionName: extension.name,
                  functionName: params.callName,
                  integrationName: this?.middleware?.integrationTag,
                };

                Object.assign(err, { errorBoundary });

                throw err;
              }
            }, Promise.resolve(params.response));
        },
      };

      const context = { ...settings, ...(this?.middleware || {}) };

      const api = await resolveApi(factoryParams.api, settings);

      const namespacedExtensions: Record<string, any> = {};
      let sharedExtensions = customApi;

      for await (const extension of rawExtensions) {
        const extendedApiMethods = await resolveApi(
          extension.extendApiMethods,
          settings
        );
        if (extension.isNamespaced) {
          const markedExtendedApiMethods = markExtensionNameHelpers.markApi(
            extendedApiMethods,
            extension.name
          );

          namespacedExtensions[extension.name] = {
            ...(namespacedExtensions?.[extension.name] ?? {}),
            ...markedExtendedApiMethods,
          };
        } else {
          const markedExtendedApiMethods = markExtensionNameHelpers.markApi(
            extendedApiMethods,
            extension.name
          );
          sharedExtensions = {
            ...sharedExtensions,
            ...markedExtendedApiMethods,
          };
        }
      }

      const integrationApi = applyContextToApi(
        api,
        // @ts-expect-error see above
        context,
        extensionHooks
      );

      const sharedExtensionsApi = applyContextToApi(
        sharedExtensions,
        // @ts-expect-error see above
        context,
        extensionHooks
      );

      const namespacedApi = {};

      for (const [namespace, extension] of Object.entries(
        namespacedExtensions
      )) {
        namespacedApi[namespace] = applyContextToApi(
          extension,
          // @ts-expect-error see above
          context,
          extensionHooks
        );
      }

      const extendedApi = {
        ...sharedExtensionsApi,
        ...namespacedApi,
      };

      const mergedApi = {
        ...integrationApi,
        ...extendedApi,
      } as ALL_FUNCTIONS;

      // api methods haven't been invoked yet, so we still have time to add them to the context
      (context as any).api = integrationApi;
      (context as any).extendedApi = extendedApi;

      return {
        api: mergedApi,
        client: settings.client,
        settings: settings.config,
      };
    };

  createApiClient._predefinedExtensions = factoryParams.extensions || [];

  return { createApiClient };
};

export { apiClientFactory };
