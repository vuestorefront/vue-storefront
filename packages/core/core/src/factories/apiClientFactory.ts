import merge from 'lodash-es/merge';
import { Interface } from 'readline';
import { Logger } from './../utils';

interface FactoryParams<T, F = any> {
  onSetup: (config: T) => T;
  api: F;
}

type ApiClientInstance<T, F = any> = { settings: T } & F;

export function apiClientFactory<ALL_SETTINGS, ALL_FUNCTIONS extends Interface>(factoryParams: FactoryParams<ALL_SETTINGS, ALL_FUNCTIONS>) {
  return {
    createApiClient (config: ALL_SETTINGS, customApi: any = {}): ApiClientInstance<ALL_SETTINGS, ALL_FUNCTIONS> {
      const settings = factoryParams.onSetup ? merge(config, factoryParams.onSetup(config)) as ALL_SETTINGS : config;

      Logger.debug('apiClientFactory.setup', settings);

      const apis = { ...factoryParams.api, ...customApi };

      const api = Object.entries(apis)
        .reduce((prev, [key, fn]: any) => ({
          ...prev,
          [key]: (...args) => fn(settings, ...args)
        }), {}) as ALL_FUNCTIONS;

      return {
        ...api,
        settings
      };
    }
  };
}
