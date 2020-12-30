import axios from 'axios';
import { Logger } from './../utils';
import { applyContextForApi } from './../utils/context';

interface ApiExtension {
  beforeSetup?: (config, headers?: Record<string, string>) => any;
  afterSetup?: ({ config, client }, headers?: Record<string, string>) => { config; client };
  beforeCall?: ({ config, functionName, params }) => any;
  afterCall?: ({ config, functionName, params }) => any;
}

interface BaseFactoryParams<T, F = any> {
  tag: string;
  api: F;
  extensions?: ApiExtension[];
  isProxy?: boolean;
}

interface FactoryParams<T, F = any> extends BaseFactoryParams<T, F> {
  onSetup: (config: T, headers?: Record<string, string>) => { config: T; client: any };
}

interface ProxyFactoryParams<T, F = any> extends BaseFactoryParams<T, F> {
  onSetup: (config: T, headers?: Record<string, string>) => { config: T };
}

export interface ApiClientInstance {
  api: any;
  client: any;
  settings: any;
}

export interface BaseConfig {
  [x: string]: any;
  client?: any;
  extensions?: ApiExtension[];
}

function apiClientFactory<ALL_SETTINGS extends BaseConfig, ALL_FUNCTIONS>(factoryParams: FactoryParams<ALL_SETTINGS, ALL_FUNCTIONS>): any;
function apiClientFactory<ALL_SETTINGS extends BaseConfig, ALL_FUNCTIONS>(factoryParams: ProxyFactoryParams<ALL_SETTINGS, ALL_FUNCTIONS>): any;

function apiClientFactory(factoryParams: any) {

  const createApiClient = (givenConfig: any, customApi: any = {}, headers?: Record<string, string>): ApiClientInstance => {
    const extensions = (factoryParams.extensions || []).concat(givenConfig.extensions || []);

    const config = extensions
      .filter(e => e.beforeSetup)
      .reduce((prev, e) => e.beforeSetup(prev, headers), givenConfig);

    const settings = factoryParams.onSetup ? factoryParams.onSetup(config, headers) : { config, client: config.client };

    Logger.debug('apiClientFactory.setup', settings);

    settings.config = extensions
      .filter(e => e.afterSetup)
      .reduce((prev: any, e) => e.afterSetup(prev, headers), settings.config);

    if (factoryParams.isProxy) {
      Logger.debug('apiClientFactory.setup creating proxy', settings);

      const client = axios.create({
        baseURL: 'http://169.254.169.254:3000/api/',
        headers
      });

      const api = factoryParams.api.reduce((p, c) => {
        return {
          ...p,
          [c]: (...args) => client
            .post(`/${factoryParams.tag}/${c}`, args)
            .then(r => r.data)
        };
      }, {});

      // const api = new Proxy(factoryParams.api, {
      //   get: (target, prop, receiver) => {
      //     const functionName = String(prop);
      //     if (Reflect.has(target, functionName)) {
      //       return () => Promise.resolve(false);
      //     }

      //     return async (...args) => client
      //       .post(`/${factoryParams.tag}/${functionName}`, args)
      //       .then(r => r.data);
      //   }
      // });

      return {
        api,
        client: settings.client,
        settings: settings.config
      };
    }

    const api = applyContextForApi(
      { ...factoryParams.api, ...customApi },
      settings,
      extensions
    );

    return {
      api,
      client: settings.client,
      settings: settings.config
    };
  };

  createApiClient.tag = factoryParams.tag;

  return { createApiClient };
}

export { apiClientFactory };
