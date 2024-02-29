import { Options, HTTPClientConfig } from "../types";

export const getHTTPClient = (options: Options) => {
  const getUrl = (path: string, config: HTTPClientConfig): string => {
    const { apiUrl, ssrApiUrl } = options;
    const { method = "POST", params = [] } = config;

    // Determine the base URL based on the environment
    const baseUrl =
      typeof window === "undefined" ? ssrApiUrl || apiUrl : apiUrl;

    // Ensure the base URL ends with a slash
    // TODO: Update eslint rule to warn on prefer-template instead of error.
    // eslint-disable-next-line prefer-template
    const normalizedBaseUrl = baseUrl.replace(/\/+$/, "") + "/";
    const url = `${normalizedBaseUrl}${path}`;
    const queryParams = method === "GET" ? params : undefined;

    // If there are no query params, return the URL as is
    if (!queryParams) {
      return url;
    }

    // If there are query params, append them to the URL as `?body=[<strignified query params>]`
    const serializedParams = encodeURIComponent(JSON.stringify(queryParams));

    return `${url}?body=${serializedParams}`;
  };

  const getConfig = (config: HTTPClientConfig): HTTPClientConfig => {
    const { defaultRequestConfig = {} } = options;
    const { method = "POST", headers = {}, params = [] } = config;
    const defaultHeaders = {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...defaultRequestConfig.headers,
    };

    return {
      ...config,
      params: method === "GET" ? [] : params,
      method,
      headers: {
        ...defaultHeaders,
        ...headers,
      },
    };
  };

  const defaultHTTPClient = async (url: string, config: HTTPClientConfig) => {
    const response = await fetch(url, config);
    return response.json();
  };

  return async (methodName: string, config: HTTPClientConfig) => {
    const { httpClient = defaultHTTPClient } = options;

    return httpClient(getUrl(methodName, config), getConfig(config));
  };
};
