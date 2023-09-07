import { TObject } from "./base";
import { ApiClientExtension, ApiMethods, ApiMethodsFactory } from "./common";

export interface ClientContext<CLIENT = any, CONFIG = any> {
  client: CLIENT;
  config: CONFIG;

  [x: string]: any;
}

export interface IntegrationContext<CLIENT = any, CONFIG = any, API = any> {
  client: CLIENT;
  config: CONFIG;
  api: API;

  [x: string]: any;
}

export interface Context<CLIENT = any, CONFIG = any, API = any> {
  [x: string]: IntegrationContext<CLIENT, CONFIG, API> | any;
}

export type PlatformApi = {
  [functionName: string]: (context: Context, ...args: any[]) => Promise<any>;
};

export type ContextedPlatformApi<T extends PlatformApi> = {
  [P in keyof T]: T[P] extends (
    context: Context,
    ...arg: infer X
  ) => Promise<any>
    ? (...arg: X) => Promise<any>
    : never;
};

export interface FactoryParams<API extends PlatformApi = any> {
  provide?: (context: Context) => any;
  api?: Partial<API>;
}

export interface ApiInstance<CONFIG, API, CLIENT> {
  api: API;
  client: CLIENT;
  settings: CONFIG;
}

export interface ApiClientConfig<CLIENT = any> {
  client?: CLIENT;
  extensions?: ApiClientExtension[];

  [x: string]: any;
}

export type CreateApiClientFn<
  CONFIG extends ApiClientConfig,
  API extends ApiMethods
> = {
  <T extends ApiClientConfig, C>(
    givenConfig: CONFIG,
    customApi?: ApiMethods
  ): ApiInstance<T, API & ApiMethods, C>;
  _predefinedExtensions?: ApiClientExtension<API>[];
};

export interface ApiClientFactoryParams<
  CONFIG extends ApiClientConfig,
  API extends ApiMethods = {},
  CLIENT = any
> {
  api: API | ApiMethodsFactory<API, CONFIG>;
  isProxy?: boolean;
  onCreate: (
    config: CONFIG,
    headers?: Record<string, string>
  ) => { client: CLIENT; config: ApiClientConfig };
  extensions?: ApiClientExtension<API>[];
}

export interface ApiClientFactory<
  CONFIG extends ApiClientConfig = any,
  API extends ApiMethods = {}
> {
  createApiClient: CreateApiClientFn<CONFIG, API>;
  /**
   * Sets up integration config, runs once.
   */
  init?: (configuration: TObject) => TObject;
}

export type CreateApiProxyFn = <CONFIG, API, CLIENT>(
  givenConfig: any,
  customApi?: any
) => ApiInstance<CONFIG, API, CLIENT>;
