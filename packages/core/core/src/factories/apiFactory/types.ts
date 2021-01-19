import { IntegrationPlugin } from './../../utils/nuxt';
export interface ApiClientExtensionLifecycle {
  beforeCreate?: (config, headers?: Record<string, string>) => any;
  afterCreate?: ({ config, client }, headers?: Record<string, string>) => { config; client };
  beforeCall?: ({ config, functionName, params }) => any;
  afterCall?: ({ config, functionName, params }) => any;
}

export type ApiClientExtension = (req: any, res: any) => ApiClientExtensionLifecycle;

export interface BaseApiFactoryParams<T, F = any> {
  tag: string;
  api: F;
  isProxy?: boolean;
}

export interface ApiClientFactoryParams<T, F = any> extends BaseApiFactoryParams<T, F> {
  onCreate: (config: T, headers?: Record<string, string>) => { config: T; client: any };
  extensions?: ApiClientExtension[];
}

export interface ApiProxyFactoryParams<T, F = any> extends BaseApiFactoryParams<T, F> {
  onCreate: (config: T, headers?: Record<string, string>) => { config: T };
}

export interface ApiInstance {
  api: any;
  client: any;
  settings: any;
}

export interface FactoryInstance {
  integrationPlugin: IntegrationPlugin;
}

export type CreateApiProxyFn = (givenConfig: any, customApi?: any) => ApiInstance
export type CreateApiClientFn = (givenConfig: any, customApi?: any) => ApiInstance;

export interface ApiProxyFactory extends FactoryInstance {
  createApiProxy: CreateApiProxyFn;
}

export interface ApiClientFactory extends FactoryInstance {
  createApiClient: CreateApiClientFn;
}

export interface ApiClientConfig {
  [x: string]: any;
  client?: any;
  extensions?: ApiClientExtension[];
}
