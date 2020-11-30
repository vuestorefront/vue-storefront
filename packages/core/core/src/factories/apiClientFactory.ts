import merge from 'lodash-es/merge';
import { Logger, composeApiWithContext } from './../utils';

interface FactoryParams<T, F = any> {
  tag: string;
  onSetup: (config: T) => { config: T; client: any };
  api: F;
}

export interface ApiClientInstance {
  api: any;
  client: any;
  settings: any;
}

export interface BaseConfig {
  [x: string]: any;
  client?: any;
}

export function apiClientFactory<ALL_SETTINGS extends BaseConfig, ALL_FUNCTIONS>(factoryParams: FactoryParams<ALL_SETTINGS, ALL_FUNCTIONS>) {

  const createApiClient = (config: ALL_SETTINGS, customApi: any = {}): ApiClientInstance => {
    const settings = factoryParams.onSetup ? merge(config, factoryParams.onSetup(config)) as ALL_SETTINGS : { config, client: config.client };

    Logger.debug('apiClientFactory.setup', settings);

    const api = composeApiWithContext({ ...factoryParams.api, ...customApi }, settings);

    return {
      api,
      client: settings.client,
      settings: settings.config
    };
  };

  createApiClient.tag = factoryParams.tag;

  return { createApiClient };
}
