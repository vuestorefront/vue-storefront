import {
  ApiClientFactoryParams,
  ApiClientConfig,
  ApiInstance,
  ApiClientFactory,
  ApiClientExtension
} from '../../types';
import { Logger } from '../../utils';
import { applyContextToApi } from './context';

const isFn = (x) => typeof x === 'function';

const apiClientFactory = <ALL_SETTINGS extends ApiClientConfig, ALL_FUNCTIONS>(factoryParams: ApiClientFactoryParams<ALL_SETTINGS, ALL_FUNCTIONS>): ApiClientFactory => {
  async function createApiClient (config: any, customApi: any = {}): Promise<ApiInstance> {
    const rawExtensions: ApiClientExtension[] = this?.middleware?.extensions || [];
    const lifecycles = Object.values(rawExtensions)
      .filter(ext => isFn(ext.hooks))
      .map(({ hooks }) => hooks(this?.middleware?.req, this?.middleware?.res));
    const extendedApis = Object.keys(rawExtensions)
      .reduce((prev, curr) => ({ ...prev, ...rawExtensions[curr].extendApiMethods }), customApi);

    const extensionsWithBeforeCreate = lifecycles
      .filter(ext => isFn(ext.beforeCreate));
    let _beforeCreateConfig = config;
    for (const ext of extensionsWithBeforeCreate) {
      _beforeCreateConfig = await ext.beforeCreate({ configuration: _beforeCreateConfig });
    }

    const settings = factoryParams.onCreate ? await factoryParams.onCreate(_beforeCreateConfig) : { config, client: config.client };

    Logger.debug('apiClientFactory.create', settings);

    const extensionsWithAfterCreate = lifecycles
      .filter(ext => isFn(ext.afterCreate));
    let _afterCreateConfig = settings.config;
    for (const ext of extensionsWithAfterCreate) {
      _afterCreateConfig = await ext.afterCreate({ configuration: _afterCreateConfig });
    }

    const extensionsWithBeforeCall = lifecycles
      .filter(ext => isFn(ext.beforeCall));
    const extensionsWithAfterCall = lifecycles
      .filter(ext => isFn(ext.afterCall));
    const extensionHooks = {
      before: async (params) => {
        let _beforeCallArgs = params.args;
        for (const ext of extensionsWithBeforeCall) {
          _beforeCallArgs = await ext.beforeCall({ ...params, configuration: settings.config, args: _beforeCallArgs });
        }
        return _beforeCallArgs;
      },
      after: async (params) => {
        let _afterCallResponse = params.response;
        for (const ext of extensionsWithAfterCall) {
          _afterCallResponse = await ext.afterCall({ ...params, configuration: settings.config, response: _afterCallResponse });
        }
        return _afterCallResponse;
      }
    };

    const api = applyContextToApi(
      { ...factoryParams.api, ...extendedApis },
      { ...settings, ...this?.middleware || {} },
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
