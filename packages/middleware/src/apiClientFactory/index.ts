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
} from "../types";
import { applyContextToApi } from "./applyContextToApi";

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

      const lifecycles = await Promise.all(
        rawExtensions
          .filter((extension): extension is ExtensionWith<"hooks"> =>
            isFunction(extension?.hooks)
          )
          .map(async ({ hooks }) =>
            hooks(this?.middleware?.req, this?.middleware?.res)
          )
      );

      const _config = await lifecycles
        .filter((extension): extension is ExtensionHookWith<"beforeCreate"> =>
          isFunction(extension?.beforeCreate)
        )
        .reduce(async (configSoFar, extension) => {
          const resolvedConfig = await configSoFar;
          return await extension.beforeCreate({
            configuration: resolvedConfig,
          });
        }, Promise.resolve(config));

      const settings = (await factoryParams.onCreate)
        ? await factoryParams.onCreate(_config)
        : { config, client: config.client };

      settings.config = await lifecycles
        .filter((extension): extension is ExtensionHookWith<"afterCreate"> =>
          isFunction(extension?.afterCreate)
        )
        .reduce(async (configSoFar, extension) => {
          const resolvedConfig = await configSoFar;
          return await extension.afterCreate({ configuration: resolvedConfig });
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
              return extension.beforeCall({
                ...params,
                configuration: resolvedSettings.config,
                args: resolvedArgs,
              });
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
              return extension.afterCall({
                ...params,
                configuration: resolvedSettings.config,
                response: resolvedResponse,
              });
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
          namespacedExtensions[extension.name] = {
            ...(namespacedExtensions?.[extension.name] ?? {}),
            ...extendedApiMethods,
          };
        } else {
          sharedExtensions = {
            ...sharedExtensions,
            ...extendedApiMethods,
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
