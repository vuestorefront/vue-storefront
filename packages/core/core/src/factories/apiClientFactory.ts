import { ApiClientFactoryParams, ApiClientConfig, ApiInstance, ApiClientFactory, ApiClientExtension } from './../types';
import { applyContextToApi } from './../utils/context';
import { Logger } from './../utils';

const isFn = (x) => typeof x === 'function';

const apiClientFactory = <ALL_SETTINGS extends ApiClientConfig, ALL_FUNCTIONS>(factoryParams: ApiClientFactoryParams<ALL_SETTINGS, ALL_FUNCTIONS>): ApiClientFactory => {
  function createApiClient (config: any, customApi: any = {}): ApiInstance {
    const rawExtensions: ApiClientExtension[] = this?.middleware?.extensions || [];
    const lifecycles = Object.values(rawExtensions)
      .filter(ext => isFn(ext.hooks))
      .map(({ hooks }) => hooks(this?.middleware?.req, this?.middleware?.res));
    const extendedApis = Object.keys(rawExtensions)
      .reduce((prev, curr) => ({ ...prev, ...rawExtensions[curr].extendApiMethods }), customApi);

    const _config = lifecycles
      .filter(ext => isFn(ext.beforeCreate))
      .reduce((prev, curr) => curr.beforeCreate({ configuration: prev }), config);

    const settings = factoryParams.onCreate ? factoryParams.onCreate(_config) : { config, client: config.client };

    Logger.debug('apiClientFactory.create', settings);

    settings.config = lifecycles
      .filter(ext => isFn(ext.afterCreate))
      .reduce((prev, curr) => curr.afterCreate({ configuration: prev }), settings.config);

    const extensionHooks = {
      before: (params) => lifecycles
        .filter(e => isFn(e.beforeCall))
        .reduce((args, e) => e.beforeCall({ ...params, configuration: settings.config, args}), params.args),
      after: (params) => lifecycles
        .filter(e => isFn(e.afterCall))
        .reduce((response, e) => e.afterCall({ ...params, configuration: settings.config, response }), params.response)
    };

    const api = applyContextToApi(
      { ...factoryParams.api, ...extendedApis },
      settings,
      extensionHooks
    );

    return {
      api,
      client: settings.client,
      settings: settings.config
    };
  }

  (createApiClient as any)._predefinedExtensions = factoryParams.extensions || [];

  return { createApiClient };
};

export { apiClientFactory };
