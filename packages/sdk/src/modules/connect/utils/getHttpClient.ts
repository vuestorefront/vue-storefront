import { Options, HTTPClient, HTTPClientConfig, ErrorHandler } from "../types";

/**
 * Configures and returns the HTTP client.
 *
 * It accepts the options to configure the HTTP client.
 * Those options are used to configure the `connect` SDK module as well.
 *
 * It might be usefull when working with SDK extensions.
 *
 * @example
 * Usage:
 * ```ts
 * import { getHttpClient } from "@vue-storefront/sdk";
 *
 * // Options used to configure the `connect` SDK module.
 * const options = {
 *  apiUrl: "https://api.example.com",
 * };
 *
 * // Get the HTTP client
 * const httpClient = getHttpClient(options);
 * ```
 */
export const getHttpClient = (options: Options): HTTPClient => {
  const getHeaders = (config?: HTTPClientConfig) => {
    return {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(options.defaultRequestConfig?.headers ?? {}),
      ...(config?.headers ?? {}),
    };
  };

  const getUrl = (path: string, queryParams?: any[]): string => {
    // Determine the base URL based on the environment
    const baseUrl =
      typeof window === "undefined"
        ? options.ssrApiUrl || options.apiUrl
        : options.apiUrl;

    // Ensure the base URL ends with a slash
    const normalizedBaseUrl = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
    const url = `${normalizedBaseUrl}${path}`;

    // If there are no query params, return the URL as is
    if (!queryParams) {
      return url;
    }

    // If there are query params, append them to the URL as `?body=[<strignified query params>]`
    const queryParamsString = JSON.stringify(queryParams);
    const urlWithParams = new URL(url);
    urlWithParams.searchParams.append("body", queryParamsString);

    return urlWithParams.toString();
  };

  const defaultHttpClient: HTTPClient = async (url, config) => {
    const response = await fetch(url, {
      ...config,
      body: JSON.stringify(config.params),
      credentials: "include",
    });
    return response.json();
  };

  const defaultErrorHandler: ErrorHandler = (error: any) => {
    throw error;
  };

  const httpClient: HTTPClient = options.httpClient || defaultHttpClient;

  return async (url, config) => {
    const headers = getHeaders(config);
    const method = config.method || "POST";
    const fullUrl = getUrl(url, method === "GET" ? config.params : undefined);

    try {
      return await httpClient(fullUrl, {
        ...config,
        params: method === "POST" ? config.params : [],
        method,
        headers,
      });
    } catch (error) {
      const errorHandler = options.errorHandler ?? defaultErrorHandler;
      return await errorHandler(error);
    }
  };
};
