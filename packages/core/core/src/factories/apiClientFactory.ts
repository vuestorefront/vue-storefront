import axios from 'axios';
import { Logger, integrationPluginFactory } from './../utils';
import { applyContextForApi } from './../utils/context';

export interface ApiExtensionInstance {
  beforeSetup?: (config, headers?: Record<string, string>) => any;
  afterSetup?: ({ config, client }, headers?: Record<string, string>) => { config; client };
  beforeCall?: ({ config, functionName, params }) => any;
  afterCall?: ({ config, functionName, params }) => any;
}

export type ApiExtension = (req: any, res: any) => ApiExtensionInstance;

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

const compose = ({ createApiClient, createApiProxy, factoryParams }: any) => {
  if (createApiClient) {
    createApiClient.tag = factoryParams.tag;
    const integrationPlugin = integrationPluginFactory(createApiClient);
    return { createApiClient, integrationPlugin };
  }

  createApiProxy.tag = factoryParams.tag;
  const integrationPlugin = integrationPluginFactory(createApiProxy);
  return { createApiProxy, integrationPlugin };
};

const createAxiosInstance = (config, givenHeaders) => {
  const axiosConfig = config.axios || {};
  axiosConfig.headers = { cookie: givenHeaders.cookie || '' };
  axiosConfig.baseURL = config.axios.baseURL ? `${config.axios.baseURL}/api/` : '/api/';

  return axios.create(axiosConfig);
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

export const apiClientFactory = <ALL_SETTINGS extends BaseConfig, ALL_FUNCTIONS>(factoryParams: FactoryParams<ALL_SETTINGS, ALL_FUNCTIONS>) => {
  function createApiClient (givenConfig: any, customApi: any = {}, headers?: Record<string, string>): ApiClientInstance {
    const extensions = factoryParams.extensions && this && this.middleware
    // eslint-disable-next-line
    ? Object.entries(factoryParams.extensions).map(([_, extensionFn]) => extensionFn(this.middleware.req, this.middleware.res))
      : [];

    const config = extensions
      .filter(ext => ext.beforeSetup)
      .reduce((prev, curr) => curr.beforeSetup(prev, headers), givenConfig);

    const settings = factoryParams.onSetup ? factoryParams.onSetup(config, headers) : { config, client: givenConfig.client };

    Logger.debug('apiClientFactory.setup', settings);

    settings.config = extensions
      .filter(ext => ext.afterSetup)
      .reduce((prev, curr) => curr.afterSetup(prev, headers), settings.config);

    const api = applyContextForApi({ ...factoryParams.api, ...customApi }, settings, extensions);

    return {
      api,
      client: settings.client,
      settings: settings.config
    };
  }

  return compose({ createApiClient, factoryParams });
};

export const apiProxyFactory = <ALL_SETTINGS, ALL_FUNCTIONS>(factoryParams: ProxyFactoryParams<ALL_SETTINGS, ALL_FUNCTIONS>) => {
  function createApiProxy (givenConfig: any, customApi: any = {}, givenHeaders?: Record<string, string>): ApiClientInstance {
    const { config } = factoryParams.onSetup ? factoryParams.onSetup(givenConfig, givenHeaders) : { config: givenConfig };

    const client = createAxiosInstance(config, givenHeaders);

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

