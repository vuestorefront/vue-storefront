import axios from 'axios';
import { applyContextToApi } from './../../utils/context';
import { Logger } from './../../utils';
import { createApiInstance } from './_utils';
import { ApiProxyFactoryParams, ApiInstance, ApiProxyFactory } from './types';
import { getIntegrationConfig, createProxiedApi } from './_proxyUtils';

const apiProxyFactory = <ALL_SETTINGS, ALL_FUNCTIONS>(factoryParams: ApiProxyFactoryParams<ALL_SETTINGS, ALL_FUNCTIONS>): ApiProxyFactory => {
  function createApiProxy (config: any, customApi: any = {}): ApiInstance {
    const _config = getIntegrationConfig({ context: this, factoryParams, givenConfig: config });
    const client = axios.create(_config.axios);
    const settings = { client, config: _config };

    (settings as any).isProxy = true;

    Logger.debug('apiProxyFactory.create', settings);

    const givenApi = applyContextToApi({ ...factoryParams.api, ...customApi }, settings);

    const api = createProxiedApi({ givenApi, client, factoryParams });

    return {
      api,
      client: settings.client,
      settings: settings.config
    };
  }

  return createApiInstance<ApiProxyFactory>({ createApiProxy }, factoryParams);
};

export default apiProxyFactory;
