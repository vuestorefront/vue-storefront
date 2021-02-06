import { ApiClientFactoryParams, ApiClientConfig, ApiInstance, ApiClientFactory } from './../types';
import { applyContextToApi } from './../utils/context';
import { Logger } from './../utils';

const apiClientFactory = <ALL_SETTINGS extends ApiClientConfig, ALL_FUNCTIONS>(factoryParams: ApiClientFactoryParams<ALL_SETTINGS, ALL_FUNCTIONS>): ApiClientFactory => {
  function createApiClient (config: any, customApi: any = {}): ApiInstance {
    const predefinedExtensions = factoryParams.extensions || [];
    const incommingExtensions = this?.middleware?.extensions || [];
    const rawExtensions = [...predefinedExtensions, ...incommingExtensions];
    const lifecycles = Object.values(rawExtensions)
      .filter(ext => typeof ext.lifecycle === 'function')
      .map(({ lifecycle }) => lifecycle(this?.middleware?.req, this?.middleware?.res));
    const extendedApis = Object.keys(rawExtensions)
      .reduce((prev, curr) => ({ ...prev, ...rawExtensions[curr].extendApi }), customApi);

    const _config = lifecycles
      .filter(ext => ext.beforeCreate)
      .reduce((prev, curr) => curr.beforeCreate({ config: prev }), config);

    const settings = factoryParams.onCreate ? factoryParams.onCreate(_config) : { config, client: config.client };

    Logger.debug('apiClientFactory.create', settings);

    settings.config = lifecycles
      .filter(ext => ext.afterCreate)
      .reduce((prev, curr) => curr.afterCreate({ config: prev }), settings.config);

    const extensionHooks = {
      before: (params) => lifecycles
        .filter(e => e.beforeCall)
        .reduce((args, e) => e.beforeCall({ ...params, args}), params.args),
      after: (params) => lifecycles
        .filter(e => e.afterCall)
        .reduce((response, e) => e.afterCall({ ...params, response }), params.response)
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

  return { createApiClient };
};

export { apiClientFactory };
