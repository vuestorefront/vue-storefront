import type { Express, Request, Response } from "express";
import { WithRequired } from "./index";
import {
  ApiClientMethod,
  ContextQuery,
  CustomQuery,
  CustomQueryFunction,
  TObject,
} from "./base";
import { ApiClient, ApiClientConfig, ApiClientFactory } from "./server";

export type ApiMethods = Record<string, ApiClientMethod>;
export type ApiMethodsFactory<
  API extends ApiMethods,
  CONFIG extends ApiClientConfig
> = (configuration: CONFIG) => API;

export type ApiClientMethodWithContext<CONTEXT> = (
  context: CONTEXT,
  ...args: any
) => any;

export type ExtendApiMethod<API, CONTEXT> = {
  [K in keyof API]?: ApiClientMethodWithContext<CONTEXT>;
} & {
  [key: string]: ApiClientMethodWithContext<CONTEXT>;
};

export interface HookParams<C> {
  configuration?: C;
}

export interface CallHookParams<C> extends HookParams<C> {
  callName: string;
}

export type BeforeCallArgs<T = any> = T;
export type AfterCallArgs<T = any> = T;

export interface BeforeCallParams<C, ARGS> extends CallHookParams<C> {
  args: BeforeCallArgs<ARGS>;
}

export interface AfterCallParams<C, ARGS, RESPONSE> extends CallHookParams<C> {
  args: BeforeCallArgs<ARGS>;
  response: AfterCallArgs<RESPONSE>;
}

export interface ApiClientExtensionHooks<C = any> {
  beforeCreate?: (params: HookParams<C>) => C;
  afterCreate?: (params: HookParams<C>) => C;
  beforeCall?: <ARGS>(params: BeforeCallParams<C, ARGS>) => BeforeCallArgs;
  afterCall?: <ARGS, RESPONSE>(
    params: AfterCallParams<C, ARGS, RESPONSE>
  ) => AfterCallArgs;
}

export interface ApiClientExtension<API = any, CONTEXT = any> {
  name: string;
  isNamespaced?: boolean;
  extendApiMethods?: ExtendApiMethod<API, CONTEXT>;
  extendApp?: ({
    app,
    configuration,
  }: {
    app: Express;
    configuration: any;
  }) => Promise<void> | void;
  hooks?: (req: Request, res: Response) => ApiClientExtensionHooks;
}

export interface Integration<
  CONFIG extends TObject = any,
  API extends ApiMethods = any,
  CONTEXT extends TObject = any
> {
  location: string;
  configuration: CONFIG;
  extensions?: <T extends ApiClientMethodWithContext<CONTEXT>>(
    extensions: ApiClientExtension<API, CONTEXT>[]
  ) => ApiClientExtension<API & T, CONTEXT>[];
  customQueries?: Record<string, CustomQueryFunction>;
  initConfig?: TObject;
  errorHandler?: (error: unknown, req: Request, res: Response) => void;
}

export interface RequestParams {
  integrationName: string;
  functionName: string;
}

export interface IntegrationLoaded<
  CONFIG extends ApiClientConfig,
  API extends ApiMethods
> {
  apiClient: ApiClientFactory<CONFIG, API>;
  initConfig: TObject;
  configuration: CONFIG;
  extensions: ApiClientExtension<API>[];
  customQueries?: Record<string, CustomQueryFunction>;
  errorHandler: (error: unknown, req: Request, res: Response) => void;
}

export interface LoadInitConfigProps {
  apiClient: ApiClientFactory;
  integration: Integration;
  tag: string;
}

export type IntegrationsLoaded<
  CONFIG extends ApiClientConfig = any,
  API extends ApiMethods = any
> = Record<string, IntegrationLoaded<CONFIG, API>>;

export interface MiddlewareContext<API extends ApiMethods = any> {
  req: Request;
  res: Response;
  extensions: ApiClientExtension<API>[];
  customQueries: Record<string, CustomQueryFunction>;
  integrations: IntegrationsLoaded;
  getApiClient: <Api = any, Config = any, Client = any>(
    integrationName: string
  ) => ApiClient<Api, Config, Client>;
}

export type ExtendQuery = <T extends ContextQuery<string>, Key extends keyof T>(
  customQuery: CustomQuery<Key> | null,
  defaults: T
) => ContextQuery<Key>;

export interface ApiContext<CONFIG, CLIENT, REQUEST, RESPONSE> {
  config: CONFIG;
  client: CLIENT;
  req: REQUEST;
  res: RESPONSE;
  extensions: any;
  customQueries: Record<string, CustomQueryFunction>;
  extendQuery: ExtendQuery;
}

export type CallableContext<API extends ApiMethods> = {
  middleware: MiddlewareContext<API>;
};

export interface ApplyingContextHooks<CONFIG = any> {
  before: <ARGS>(params: BeforeCallParams<CONFIG, ARGS>) => BeforeCallArgs;
  after: <ARGS, RESPONSE>(
    params: AfterCallParams<CONFIG, ARGS, RESPONSE>
  ) => AfterCallArgs;
}

export type ExtensionHookWith<T extends keyof ApiClientExtensionHooks> =
  WithRequired<ApiClientExtensionHooks, T>;
export type ExtensionWith<T extends keyof ApiClientExtension> = WithRequired<
  ApiClientExtension,
  T
>;
