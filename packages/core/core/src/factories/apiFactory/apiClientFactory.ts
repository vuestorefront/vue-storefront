import { ApiFactoryParams, BaseConfig, ApiInstance, ClientFactoryInstance } from './types';
import { applyContextForApi } from './../../utils/context';
import { createInstance } from './_utils';
import { Logger } from './../../utils';

const apiClientFactory = <ALL_SETTINGS extends BaseConfig, ALL_FUNCTIONS>(factoryParams: ApiFactoryParams<ALL_SETTINGS, ALL_FUNCTIONS>): ClientFactoryInstance => {
  function createApiClient (config: any, customApi: any = {}): ApiInstance {
    const extensions = factoryParams.extensions && this && this.middleware
    // eslint-disable-next-line
    ? Object.entries(factoryParams.extensions).map(([_, extensionFn]) => extensionFn(this.middleware.req, this.middleware.res))
      : [];

    const _config = extensions
      .filter(ext => ext.beforeSetup)
      .reduce((prev, curr) => curr.beforeSetup(prev), config);

    const settings = factoryParams.onSetup ? factoryParams.onSetup(_config) : { config, client: config.client };

    Logger.debug('apiClientFactory.setup', settings);

    settings.config = extensions
      .filter(ext => ext.afterSetup)
      .reduce((prev, curr) => curr.afterSetup(prev), settings.config);

    const api = applyContextForApi({ ...factoryParams.api, ...customApi }, settings, extensions);

    return {
      api,
      client: settings.client,
      settings: settings.config
    };
  }

  return createInstance<ClientFactoryInstance>({ createApiClient }, factoryParams);
};

export default apiClientFactory;
