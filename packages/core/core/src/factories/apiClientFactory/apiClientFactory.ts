import { ApiFactoryParams, BaseConfig, ApiClientInstance } from './types';
import { applyContextForApi } from './../../utils/context';
import { compose } from './_utils';
import { Logger } from './../../utils';

const apiClientFactory = <ALL_SETTINGS extends BaseConfig, ALL_FUNCTIONS>(factoryParams: ApiFactoryParams<ALL_SETTINGS, ALL_FUNCTIONS>) => {
  function createApiClient (givenConfig: any, customApi: any = {}): ApiClientInstance {
    const extensions = factoryParams.extensions && this && this.middleware
    // eslint-disable-next-line
    ? Object.entries(factoryParams.extensions).map(([_, extensionFn]) => extensionFn(this.middleware.req, this.middleware.res))
      : [];

    const config = extensions
      .filter(ext => ext.beforeSetup)
      .reduce((prev, curr) => curr.beforeSetup(prev), givenConfig);

    const settings = factoryParams.onSetup ? factoryParams.onSetup(config) : { config, client: givenConfig.client };

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

  return compose({ createApiClient, factoryParams });
};

export default apiClientFactory;
