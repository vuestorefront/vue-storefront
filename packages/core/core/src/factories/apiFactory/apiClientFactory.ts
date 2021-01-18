import { ApiClientFactoryParams, BaseConfig, ApiInstance, ClientFactoryInstance } from './types';
import { applyContextToApi } from './../../utils/context';
import { createApiInstance } from './_utils';
import { Logger } from './../../utils';

const apiClientFactory = <ALL_SETTINGS extends BaseConfig, ALL_FUNCTIONS>(factoryParams: ApiClientFactoryParams<ALL_SETTINGS, ALL_FUNCTIONS>): ClientFactoryInstance => {
  function createApiClient (config: any, customApi: any = {}): ApiInstance {
    const extensions = factoryParams.extensions && this && this.middleware
    // eslint-disable-next-line
    ? Object.entries(factoryParams.extensions).map(([_, extensionFn]) => extensionFn(this.middleware.req, this.middleware.res))
      : [];

    const _config = extensions
      .filter(ext => ext.beforeCreate)
      .reduce((prev, curr) => curr.beforeCreate(prev), config);

    const settings = factoryParams.onCreate ? factoryParams.onCreate(_config) : { config, client: config.client };

    Logger.debug('apiClientFactory.create', settings);

    settings.config = extensions
      .filter(ext => ext.afterCreate)
      .reduce((prev, curr) => curr.afterCreate(prev), settings.config);

    const api = applyContextToApi({ ...factoryParams.api, ...customApi }, settings, extensions);

    return {
      api,
      client: settings.client,
      settings: settings.config
    };
  }

  return createApiInstance<ClientFactoryInstance>({ createApiClient }, factoryParams);
};

export default apiClientFactory;
