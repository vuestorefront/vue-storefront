import type { Express, Request, Response } from "express";
import type { LoggerInterface } from "@vue-storefront/logger";
import type { LoggerOptions } from "./config";
import {
  ApiClientMethod,
  ContextQuery,
  CustomQuery,
  CustomQueryFunction,
  TObject,
} from "./base";
import { UploadedFile, WithRequired } from "./index";
import { ApiClient, ApiClientConfig, ApiClientFactory } from "./server";

export type AlokaiResponse = Response<
  any,
  {
    alokai?: {
      logger: LoggerInterface;
    };
    apiFunction?: (...args: any[]) => any;
    fnOrigin?: string;
    [key: string]: any;
  }
>;

export type AlokaiRequest = Request & {
  files?:
    | {
        [fieldname: string]: UploadedFile[];
      }
    | UploadedFile[]
    | undefined;
};

export type ExtensionEndpointHandler = ApiClientMethod & {
  _extensionName?: string;
};

export type ApiMethods = Record<
  string,
  ApiClientMethod | ExtensionEndpointHandler
>;
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
  logger?: LoggerInterface;
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

export type AlokaiContainer = {
  logger: LoggerInterface;
};

export interface ApiClientExtension<API = any, CONTEXT = any, CONFIG = any> {
  name: string;
  isNamespaced?: boolean;
  extendApiMethods?:
    | ExtendApiMethod<API, CONTEXT>
    | ApiMethodsFactory<ExtendApiMethod<API, CONTEXT>, CONFIG>;
  extendApp?: ({
    app,
    configuration,
  }: {
    app: Express;
    configuration: any;
    logger: LoggerInterface;
  }) => Promise<void> | void;
  hooks?: (
    req: AlokaiRequest,
    res: AlokaiResponse,
    hooksContext: AlokaiContainer
  ) => ApiClientExtensionHooks;
}

export type ErrorHandler = (
  error: unknown,
  req: AlokaiRequest,
  res: AlokaiResponse
) => void;

export interface Integration<
  CONFIG extends TObject = any,
  API extends ApiMethods = any,
  CONTEXT extends TObject = any
> {
  location: string;
  configuration: CONFIG;
  logger?: LoggerOptions;
  extensions?: (
    extensions: ApiClientExtension<API, CONTEXT>[]
    // TODO(IN-4338): There is a bug in the types here
    // we're not able to verify if the methods are namespaced or not with this implementation.
  ) => ApiClientExtension<API, CONTEXT>[];
  customQueries?: Record<string, CustomQueryFunction>;
  initConfig?: TObject;
  /**
   * Custom error handler for middleware.
   *
   * This function is invoked whenever an error occurs during middleware execution.
   * Alokai provides a default error handler, which will be used if this property is not set.
   *
   * @param {unknown} error - The error object or value that triggered the handler.
   * @param {AlokaiRequest} req - The HTTP request object associated with the error.
   * @param {AlokaiResponse} res - The HTTP response object for sending a response.
   *
   * @example
   * ```ts
   * {
   *  errorHandler: (error, req, res) => {
   *    if (typeof error === "object" && error !== null && "message" in error) {
   *      res.status(500).send({ message: (error as any).message });
   *    } else {
   *      res.status(500).send({ message: "An unknown error occurred" });
   *    }
   *  }
   * }
   * ```
   *
   * @example
   * Using the default error handler with custom behavior
   * ```ts
   * import { defaultErrorHandler } from "@vue-storefront/middleware";
   *
   * {
   *   errorHandler: (error, req, res) => {
   *     // Perform custom actions before delegating to the default error handler
   *     defaultErrorHandler(error, req, res);
   *   }
   * };
   * ```
   */
  errorHandler?: ErrorHandler;
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
  errorHandler: (error: unknown, req: Request, res: AlokaiResponse) => void;
}

export interface LoadInitConfigProps {
  apiClient: ApiClientFactory;
  integration: Integration;
  tag: string;
  alokai: AlokaiContainer;
}

export type IntegrationsLoaded<
  CONFIG extends ApiClientConfig = any,
  API extends ApiMethods = any
> = Record<string, IntegrationLoaded<CONFIG, API>>;

export interface MiddlewareContext<API extends ApiMethods = any> {
  req: AlokaiRequest;
  res: AlokaiResponse;
  extensions: ApiClientExtension<API>[];
  customQueries: Record<string, CustomQueryFunction>;
  integrations: IntegrationsLoaded;
  integrationTag: string;
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
  integrationTag: string;
};

export interface ApplyingContextHooks<CONFIG = any> {
  before: <ARGS>(params: BeforeCallParams<CONFIG, ARGS>) => BeforeCallArgs;
  after: <ARGS, RESPONSE>(
    params: AfterCallParams<CONFIG, ARGS, RESPONSE>
  ) => AfterCallArgs;
}

export type ExtensionHookWith<T extends keyof ApiClientExtensionHooks> =
  WithRequired<ApiClientExtensionHooks, T> & {
    name: string;
  };
export type ExtensionWith<T extends keyof ApiClientExtension> = WithRequired<
  ApiClientExtension,
  T
>;

/**
 * Removes the `context` from the methods of an API Client.
 * `context` is an internal parameter added by the Server Middleware to the methods of the API Client.
 * Removing it allows to define the contract of the endpoints exposed by the Server Middleware.
 *
 * @example
 *
 * ```ts
 * type ApiClientMethods = {
 *  getProduct: (context: any, id: string) => Promise<Product>;
 * }
 *
 * type Endpoints = WithoutContext<ApiClientMethods>;
 * // { getProduct: (id: string) => Promise<Product> }
 * ```
 */
export type WithoutContext<Methods extends ApiMethods> = {
  [T in keyof Methods]: Methods[T] extends (
    context: any,
    ...arguments_: infer P
  ) => infer R
    ? (...arguments_: P) => R
    : never;
};

export type LogScope = {
  integrationName: string;
  extensionName?: string;
  functionName?: string;
  hookName?:
    | "extendApp"
    | "hooks"
    | "onCreate"
    | "init"
    | "beforeCall"
    | "beforeCreate"
    | "afterCall"
    | "afterCreate";
  type: "endpoint" | "bootstrapHook" | "requestHook";
};

export type AlokaiLocal = {
  metadata?: {
    context?: string;
    scope?: LogScope;
    errorBoundary?: LogScope;
  };
};
