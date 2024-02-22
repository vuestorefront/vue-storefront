import { AnyFunction } from "../../types";

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
  config: any
) => Promise<any>;

/**
 * Options for the `moduleFromEndpoints`.
 */
export interface Options {
  /**
   * Base URL for the API.
   */
  apiUrl: string;

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
}
