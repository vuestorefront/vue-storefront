import axios from 'axios';
import merge from 'lodash-es/merge';
import { applyContextForApi } from './../../utils/context';
import { Logger } from './../../utils';
import { compose } from './_utils';
import { ApiProxyFactoryParams, ApiClientInstance } from './types';

const getBaseUrl = (req) => {
  if (!req) return '/api/';
  const { headers } = req;
  const isHttps = require('is-https')(req);
  const scheme = isHttps ? 'https' : 'http';
  const host = headers['x-forwarded-host'] || headers.host;

  return `${scheme}://${host}/api/`;
};

const createProxy = ({ givenApi, client, factoryParams }) => new Proxy(givenApi, {
  get: (target, prop, receiver) => {
    const functionName = String(prop);
    if (Reflect.has(target, functionName)) {
      return Reflect.get(target, prop, receiver);
    }

    return async (...args) => client
      .post(`/${factoryParams.tag}/${functionName}`, args)
      .then(r => r.data);
  }
});

const getCookies = (context) => (context && context.req && context.req.headers.cookie) || '';

const getConfig = ({ context, factoryParams, givenConfig }) => {
  const cookie = getCookies(context);
  const initialConfig = merge({
    axios: {
      baseURL: getBaseUrl(context && context.req),
      headers: {
        ...(cookie ? { cookie } : {})
      }
    }
  }, givenConfig);

  if (factoryParams.onSetup) {
    return factoryParams.onSetup(initialConfig).config;
  }

  return initialConfig;
};

const apiProxyFactory = <ALL_SETTINGS, ALL_FUNCTIONS>(factoryParams: ApiProxyFactoryParams<ALL_SETTINGS, ALL_FUNCTIONS>) => {
  function createApiProxy (givenConfig: any, customApi: any = {}): ApiClientInstance {
    const config = getConfig({ context: this, factoryParams, givenConfig });

    const client = axios.create(config.axios);
    const settings = { client, config };

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

  return compose({ createApiProxy, factoryParams });
};

export default apiProxyFactory;
