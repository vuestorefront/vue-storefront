import { CorsOptions, CorsOptionsDelegate } from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { TObject } from "./base";
import {
  ApiClientExtension,
  ApiMethods,
  ApiMethodsFactory,
  MiddlewareContext,
} from "./common";

export interface ClientContext<CLIENT = any, CONFIG = any> {
  client: CLIENT;
  config: CONFIG;

  [x: string]: any;
}

export interface IntegrationContext<CLIENT = any, CONFIG = any, API = any>
  extends MiddlewareContext {
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

/**
 * All available API methods without first argument - `context`, because this prop is set automatically.
 */
export type ContextualizedApi<API> = {
  [T in keyof API]: API[T] extends (
    context: any,
    ...arguments_: infer P
  ) => infer R
    ? (...arguments_: P) => R
    : never;
};

export interface ApiClient<API = any, CONFIG = any, CLIENT = any> {
  api: API;
  client: CLIENT;
  settings: CONFIG & { integrationName: string };
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

export interface CreateServerOptions {
  /**
   * The options for the `express.json` middleware.
   * If not provided, the default options will be used.
   * @see https://www.npmjs.com/package/body-parser
   */
  bodyParser?: bodyParser.OptionsJson;
  /**
   * The options for the `cookie-parser` middleware.
   * If not provided, the default options will be used.
   * @see https://www.npmjs.com/package/cookie-parser
   */
  cookieParser?: {
    secret: string | string[];
    options: cookieParser.CookieParseOptions;
  };
  /**
   * The options for the `cors` middleware.
   * If not provided, the following configuration will be used:
   * ```json
   * {
   *  "credentials": true,
   *  "origin": ["http://localhost:3000", "http://localhost:4000"]
   * }
   * ```
   * @see https://www.npmjs.com/package/cors
   */
  cors?: CorsOptions | CorsOptionsDelegate;
}
