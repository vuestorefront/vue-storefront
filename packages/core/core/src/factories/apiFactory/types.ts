import { IntegrationPlugin } from './../../utils/nuxt';
export interface ApiExtensionInstance {
  beforeSetup?: (config, headers?: Record<string, string>) => any;
  afterSetup?: ({ config, client }, headers?: Record<string, string>) => { config; client };
  beforeCall?: ({ config, functionName, params }) => any;
  afterCall?: ({ config, functionName, params }) => any;
}

export type ApiExtension = (req: any, res: any) => ApiExtensionInstance;

export interface BaseApiFactoryParams<T, F = any> {
  tag: string;
  api: F;
  isProxy?: boolean;
}

export interface ApiFactoryParams<T, F = any> extends BaseApiFactoryParams<T, F> {
  onSetup: (config: T, headers?: Record<string, string>) => { config: T; client: any };
  extensions?: ApiExtension[];
}

export interface ApiProxyFactoryParams<T, F = any> extends BaseApiFactoryParams<T, F> {
  onSetup: (config: T, headers?: Record<string, string>) => { config: T };
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

export interface ProxyFactoryInstance extends FactoryInstance {
  createApiProxy: CreateApiProxyFn;
}

export interface ClientFactoryInstance extends FactoryInstance {
  createApiClient: CreateApiClientFn;
}

export interface BaseConfig {
  [x: string]: any;
  client?: any;
  extensions?: ApiExtension[];
}
