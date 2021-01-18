import axios from 'axios';
import { applyContextForApi } from './../../utils/context';
import { Logger } from './../../utils';
import { createInstance } from './_utils';
import { ApiProxyFactoryParams, ApiInstance, ProxyFactoryInstance } from './types';
import { getConfig, createProxy } from './_proxyUtils';

const apiProxyFactory = <ALL_SETTINGS, ALL_FUNCTIONS>(factoryParams: ApiProxyFactoryParams<ALL_SETTINGS, ALL_FUNCTIONS>): ProxyFactoryInstance => {
  function createApiProxy (config: any, customApi: any = {}): ApiInstance {
    const _config = getConfig({ context: this, factoryParams, givenConfig: config });
    const client = axios.create(_config.axios);
    const settings = { client, config: _config };

    (settings as any).isProxy = true;

    Logger.debug('apiProxyFactory.setup', settings);

    const givenApi = applyContextForApi({ ...factoryParams.api, ...customApi }, settings);

    const api = createProxy({ givenApi, client, factoryParams });

    return {
      api,
      client: settings.client,
      settings: settings.config
    };
  }

  return createInstance<ProxyFactoryInstance>({ createApiProxy }, factoryParams);
};

export default apiProxyFactory;
