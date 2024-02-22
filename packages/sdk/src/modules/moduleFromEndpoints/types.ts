import { AnyFunction } from "../../types";
import { isRequestConfig } from "./consts";

/**
 * Constraint for the endpoints.
 *
 * @example
 * ```ts
 * type Endpoints = {
 *   getUser: (id: string) => Promise<User>;
 *   createUser: (data: CreateUser) => Promise<User>;
 * };
 * ```
 */
export type EndpointsConstraint = {
  [key: string]: AnyFunction;
};

/**
 * Config for the request.
 */
export interface RequestConfig {
  /**
   * Headers for the request.
   */
  headers?: Record<string, string>;
  /**
   * HTTP method for the request.
   */
  method?: "GET" | "POST";
}

/**
 * Config for the HTTP client.
 */
export interface HTTPClientConfig extends RequestConfig {
  /**
   * Parameters for the request.
   */
  params?: any[];
}

/**
 * Config for the SDK method.
 */
export interface MethodConfig extends RequestConfig {
  /**
   * It's used to differentiate the method config from the params.
   */
  [isRequestConfig]: boolean;
}

/**
 * HTTP Client abstraction.
 */
export type HTTPClient = (
  /**
   * URL for the request.
   */
  url: string,
  /**
   * Config for the request.
   */
  config: HTTPClientConfig
) => Promise<any>;

/**
 * Error handler abstraction.
 */
export type ErrorHandler = (error: any) => Promise<any>;

/**
 * Options for the `moduleFromEndpoints`.
 */
export type Options = {
  /**
   * Base URL for the API.
   */
  apiUrl: string;

  /**
   * Base URL for the API in the server side rendering.
   * It's optional and it will use the `apiUrl` if it's not provided.
   *
   * @remarks
   * This may be useful during implementation of a multi-store feature based on domains.
   *
   * `apiUrl` could be set to `/api` and on the client side, the HTTP Client would use the current domain.
   *
   * However, on the server side, the HTTP Client is not aware of the current domain, so it would use just the `/api` path and it would fail.
   *
   * To solve this issue, the `ssrApiUrl` could be set to the pod name with port (e.g. `https://localhost:8181`) and the HTTP Client would use it on the server side.
   */
  ssrApiUrl?: string;

  /**
   * Custom HTTP Client.
   *
   * It's optional and it will use the default HTTP Client if it's not provided.
   *
   * @example
   * Using `axios` as the HTTP Client
   * ```ts
   * import axios from "axios";
   *
   * const options: Options = {
   *   apiUrl: "https://api.example.com",
   *   httpClient: (url, config) => {
   *     if (config.method === "GET") {
   *       const queryParams = new URLSearchParams(config.params);
   *       const urlWithParams = new URL(url);
   *       urlWithParams.search = queryParams.toString();
   *       return axios({
   *         ...config,
   *         url: urlWithParams.toString(),
   *       });
   *     }
   *
   *     return axios({
   *       ...config,
   *       url,
   *     });
   *   },
   * };
   * ```
   */
  httpClient?: HTTPClient;

  /**
   * Default request config for each request.
   */
  defaultRequestConfig?: RequestConfig;

  /**
   * Custom error handler for the requests.
   *
   * It's optional and it will use the default error handler if it's not provided.
   *
   * @example
   * ```ts
   * const options: Options = {
   *   apiUrl: "https://api.example.com",
   *   errorHandler: (error) => {
   *     return refreshAndRetry(error);
   *   },
   * };
   * ```
   */
  errorHandler?: ErrorHandler;
};

/**
 * Final type for the SDK methods.
 *
 * It requires the `Endpoints` interface to be provided.
 * Based on this interface it will generate the methods with the correct parameters and return types.
 *
 * To each endpoint, it will add the `config` parameter with the `MethodConfig` type.
 */
export type Methods<Endpoints extends EndpointsConstraint> = {
  [Key in keyof Endpoints]: (
    ...params: [...Parameters<Endpoints[Key]>, config?: MethodConfig]
  ) => ReturnType<Endpoints[Key]>;
};
