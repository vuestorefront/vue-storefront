import {
  ApiClientFactoryParams,
  ApiClientConfig,
  ApiInstance,
  ApiClientFactory,
  ApiClientExtension
} from './../../types';
import { Logger } from './../../utils';
import { applyContextToApi } from './context';

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
      .reduce((configuration, curr) => curr.beforeCreate({ configuration }), config);

    const settings = factoryParams.onCreate ? factoryParams.onCreate(_config) : { config, client: config.client };

    Logger.debug('apiClientFactory.create', settings);

    settings.config = lifecycles
      .filter(ext => isFn(ext.afterCreate))
      .reduce((configuration, curr) => curr.afterCreate({ configuration }), settings.config);

    const before = async (params) => lifecycles
      .filter(e => isFn(e.beforeCall))
      .reduce((args, e) => args.then(args => e.beforeCall({ ...params, configuration: settings.config, args})), Promise.resolve(params.args));

    const after = async (params) => lifecycles
      .filter(e => isFn(e.afterCall))
      .reduce((response, e) => response.then(response => e.afterCall({ ...params, configuration: settings.config, response })), Promise.resolve(params.response));

    const api = applyContextToApi(
      { ...factoryParams.api, ...extendedApis },
      { ...settings, ...this?.middleware || {} },
      { before, after }
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
