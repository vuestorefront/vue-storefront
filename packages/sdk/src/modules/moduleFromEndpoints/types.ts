import { AnyFunction } from "../../types";
import { isConfig } from "./consts";

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
 * Defines the basic configuration for an HTTP request.
 * Specifies the HTTP method to be used.
 */
export type BaseConfig = {
  /**
   * The HTTP method for the request. Optional. Can be "GET" or "POST".
   * @default "POST"
   */
  method?: "GET" | "POST";
};

/**
 * User-defined configuration for HTTP requests, extending `BaseConfig`.
 * Allows custom headers, supporting both strings and arrays of strings for header values.
 */
export type IncomingConfig = BaseConfig & {
  /**
   * Optional custom headers. Keys are header names, values can be a string or an array of strings.
   */
  headers?: Record<string, string | string[]>;
};

/**
 * Computed configuration for HTTP requests, derived from `IncomingConfig`.
 * Normalizes header values to strings for consistent request formatting.
 */
export type ComputedConfig = BaseConfig & {
  /**
   * Normalized headers for the HTTP request, ensuring all values are strings.
   */
  headers?: Record<string, string>;
};

/**
 * Configuration specific to a method, merging `IncomingConfig` with an internal flag.
 * Indicates that the configuration is ready for making a request.
 */
export type MethodConfig = IncomingConfig & {
  /**
   * Internal flag to mark the configuration as specific to a request.
   */
  [isConfig]: boolean;
};

/**
 * HTTP Client abstraction.
 */
export type HTTPClient = (
  /**
   * URL for the request.
   */
  url: string,
  /**
   * Parameters for the request.
   */
  params: any[],
  /**
   * Config for the request.
   */
  config?: ComputedConfig
) => Promise<any>;

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
   *   httpClient: async (url, params, config) => {
   *    const { data } = await axios(url, {
   *      ...config,
   *      data: params,
   *    });
   *
   *    return data;
   *  },
   * };
   * ```
   */
  httpClient?: HTTPClient;

  /**
   * Default request config for each request.
   */
  defaultRequestConfig?: IncomingConfig;
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
