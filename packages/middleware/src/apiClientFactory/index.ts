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
import { isFunction } from "../helpers";
import { applyContextToApi } from "./applyContextToApi";

const apiClientFactory = <
  ALL_SETTINGS extends ApiClientConfig,
  ALL_FUNCTIONS extends ApiMethods
>(
  factoryParams: ApiClientFactoryParams<ALL_SETTINGS, ALL_FUNCTIONS>
): ApiClientFactory<any, ALL_FUNCTIONS> => {
  const createApiClient: CreateApiClientFn<any, ALL_FUNCTIONS> =
    function createApiClient(
      this: CallableContext<ALL_FUNCTIONS>,
      config,
      customApi: Record<string, any> = {}
    ) {
      const rawExtensions: ApiClientExtension<ALL_FUNCTIONS>[] =
        this?.middleware?.extensions || [];

      const lifecycles = rawExtensions
        .filter((extension): extension is ExtensionWith<"hooks"> =>
          isFunction(extension?.hooks)
        )
        .map(({ hooks }) =>
          hooks(this?.middleware?.req, this?.middleware?.res)
        );

      const _config = lifecycles
        .filter((extension): extension is ExtensionHookWith<"beforeCreate"> =>
          isFunction(extension?.beforeCreate)
        )
        .reduce(
          (configSoFar, extension) =>
            extension.beforeCreate({ configuration: configSoFar }),
          config
        );

      const settings = factoryParams.onCreate
        ? factoryParams.onCreate(_config)
        : { config, client: config.client };

      settings.config = lifecycles
        .filter((extension): extension is ExtensionHookWith<"afterCreate"> =>
          isFunction(extension?.afterCreate)
        )
        .reduce(
          (configSoFar, extension) =>
            extension.afterCreate({ configuration: configSoFar }),
          settings.config
        );

      const extensionHooks: ApplyingContextHooks = {
        before: (params) =>
          lifecycles
            .filter((extension): extension is ExtensionHookWith<"beforeCall"> =>
              isFunction(extension?.beforeCall)
            )
            .reduce(
              (args, extension) =>
                extension.beforeCall({
                  ...params,
                  configuration: settings.config,
                  args,
                }),
              params.args
            ),
        after: (params) =>
          lifecycles
            .filter((extension): extension is ExtensionHookWith<"afterCall"> =>
              isFunction(extension.afterCall)
            )
            .reduce(
              (response, extension) =>
                extension.afterCall({
                  ...params,
                  configuration: settings.config,
                  response,
                }),
              params.response
            ),
      };

      const context = { ...settings, ...(this?.middleware || {}) };

      const { api: apiOrApiFactory = {} } = factoryParams;

      const isApiFactory = typeof apiOrApiFactory === "function";
      const api = isApiFactory ? apiOrApiFactory(settings) : apiOrApiFactory;

      const namespacedExtensions: Record<string, any> = {};
      let sharedExtensions = customApi;

      // If the extension is namespaced, we need to merge the extended api methods into the namespace
      // Otherwise, we can just merge the extended api methods into the api
      rawExtensions.forEach((extension) => {
        if (extension.isNamespaced) {
          namespacedExtensions[extension.name] = {
            ...(namespacedExtensions?.[extension.name] ?? {}),
            ...extension.extendApiMethods,
          };
        } else {
          sharedExtensions = {
            ...sharedExtensions,
            ...extension.extendApiMethods,
          };
        }
      });

      /**
       * FIXME IN-3487
       *
       * `applyContextToApi` requires `context` to be of type `MiddlewareContext`
       * However, the above `const context =` does not satisfy that type.
       *
       * `this.middleware` provides (among others) `{ req: ..., res: ..., ... }`,
       * but `this?.middleware || {}` provides `{ req?: ..., res?: ..., ...}`
       *
       * `MiddlewareContext` requires `req` and `res` to be required, not optional, hence the error.
       */
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

      const mergedApi = {
        ...integrationApi,
        ...sharedExtensionsApi,
        ...namespacedApi,
      } as ALL_FUNCTIONS;

      // api methods haven't been invoked yet, so we still have time to add them to the context
      (context as any).api = integrationApi;

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
