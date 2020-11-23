import merge from 'lodash-es/merge';
import { Logger } from './../utils';

interface FactoryParams<T, F = any> {
  tag: string;
  onSetup: (config: T) => { config: T; client: any };
  api: F;
}

export interface ApiClientInstance {
  api: any;
  client: any;
  settings: any;
  tag: string;
}

export interface BaseConfig {
  [x: string]: any;
  client?: any;
}

export function apiClientFactory<ALL_SETTINGS extends BaseConfig, ALL_FUNCTIONS>(factoryParams: FactoryParams<ALL_SETTINGS, ALL_FUNCTIONS>) {
  return {
    createApiClient (config: ALL_SETTINGS, customApi: any = {}): ApiClientInstance {
      const settings = factoryParams.onSetup ? merge(config, factoryParams.onSetup(config)) as ALL_SETTINGS : { config, client: config.client };

      Logger.debug('apiClientFactory.setup', settings);

      const apis = { ...factoryParams.api, ...customApi };

      const api = Object.entries(apis)
        .reduce((prev, [key, fn]: any) => ({
          ...prev,
          [key]: (...args) => fn(settings, ...args)
        }), {}) as ALL_FUNCTIONS;

      return {
        api,
        client: settings.client,
        settings: settings.config,
        tag: factoryParams.tag
      };
    }
  };
}
