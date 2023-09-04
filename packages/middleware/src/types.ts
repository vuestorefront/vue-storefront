/* istanbul ignore file */

import type { Express, Request, Response } from 'express';
import { HelmetOptions } from 'helmet';

export interface Integration {
  location: string;
  configuration: any;
  extensions?: (extensions: ApiClientExtension[]) => ApiClientExtension[];
  customQueries?: Record<string, CustomQueryFn>;
}

export interface ApiClientFactory {
  createApiClient: CreateApiClientFn;

  /**
   * Sets up integration config, runs once.
   */
  init?: (configuration: Record<string, any>) => Record<string, any>;
}

export interface ApiClientExtension {
  name: string;
  extendApiMethods?: Record<string, ApiClientMethod>;
  extendApp?: (params: { app: Express; configuration: any }) => void;
  hooks?: (req: Request, res: Response) => ApiClientExtensionHooks;
}

export type IntegrationsSection = Record<string, Integration>;

export type CustomQuery = Record<string, string | Record<string, string>>;


export type ComposableFunctionArgs<T> = T & { customQuery?: CustomQuery };

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
  [P in keyof T]: T[P] extends (context: Context, ...arg: infer X) => Promise<any> ? (...arg: X) => Promise<any> : never;
};

export interface Composable<API extends PlatformApi> {
  api?: ContextedPlatformApi<API>;
}



export interface VSFLogger {
  debug(message?: any, ...args: any): void;
  info(message?: any, ...args: any): void;
  warn(message?: any, ...args: any): void;
  error(message?: any, ...args: any): void;
}

export interface FactoryParams<API extends PlatformApi = any> {
  provide?: (context: Context) => any;
  api?: Partial<API>;
}

export interface HookParams<C> {
  configuration: C;
}

export interface CallHookParams<C> extends HookParams<C> {
  callName: string;
}

export type BeforeCallArgs = any;
export type AfterCallArgs = any;

export interface BeforeCallParams<C> extends CallHookParams<C> {
  args: BeforeCallArgs;
}

export interface AfterCallParams<C> extends CallHookParams<C> {
  response: AfterCallArgs;
}

export interface ApiClientExtensionHooks<C = any> {
  beforeCreate?: (params: HookParams<C>) => C;
  afterCreate?: (params: HookParams<C>) => C;
  beforeCall?: (params: BeforeCallParams<C>) => BeforeCallArgs;
  afterCall?: (params: AfterCallParams<C>) => AfterCallArgs;
}

export type CustomQueryFn<T = any> = ({ query, variables, metadata }) => {
  query?: any;
  variables?: T;
  metadata: any;
};

export type ApiClientMethod = (...args: any) => Promise<any>;

export interface MiddlewareConfig {
  integrations: Record<string, Integration>;
  helmet?: boolean | Readonly<HelmetOptions>;
}

export interface ApiClientFactoryParams<T, F = any> {
  api: F;
  isProxy?: boolean;
  onCreate: (config: T, headers?: Record<string, string>) => { config: T; client: any };
  extensions?: ApiClientExtension[];
}

export interface ApiInstance {
  api: any;
  client: any;
  settings: any;
}

export type CreateApiProxyFn = (givenConfig: any, customApi?: any) => ApiInstance;
export type CreateApiClientFn = (givenConfig: any, customApi?: any) => ApiInstance;


export interface ApiClientConfig {
  [x: string]: any;
  client?: any;
  extensions?: ApiClientExtension[];
}

export type ApiClientMethods<T> = {
  [K in keyof T]: T[K] extends (...args: any) => any ? (...args: [...Parameters<T[K]>, CustomQuery?]) => ReturnType<T[K]> : T[K];
};

export interface UseStoreErrors {
  load: Error | null;
  change: Error | null;
}
