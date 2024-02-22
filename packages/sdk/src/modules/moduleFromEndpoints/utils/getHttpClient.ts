import { Options, HTTPClientConfig } from "../types";

export const getHTTPClient = (options: Options) => {
  const getNormalizedBaseUrl = (): string => {
    const baseUrl =
      typeof window === "undefined"
        ? options.ssrApiUrl || options.apiUrl
        : options.apiUrl;

    return baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
  };

  const getUrlWithParams = (path: string, config: HTTPClientConfig): string => {
    const url = new URL(`${getNormalizedBaseUrl()}${path}`);

    if (config.method === "GET" && config.params && config.params.length) {
      url.searchParams.append("body", JSON.stringify(config.params));
    }

    return url.toString();
  };

  const getMergedConfig = (config: HTTPClientConfig): HTTPClientConfig => {
    const defaultHeaders = {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...options.defaultRequestConfig?.headers,
    };

    return {
      ...config,
      method: config.method || "POST",
      params: config.method === "GET" ? [] : config.params,
      headers: { ...defaultHeaders, ...config.headers },
    };
  };

  const defaultHTTPClient = async (url: string, config: HTTPClientConfig) => {
    const response = await fetch(url, config);
    return response.json();
  };

  return async (methodName: string, config: HTTPClientConfig) => {
    const httpClient = options.httpClient || defaultHTTPClient;

    try {
      const url = getUrlWithParams(methodName, config);
      const finalConfig = getMergedConfig(config);

      return await httpClient(url, finalConfig);
    } catch (error) {
      if (options.errorHandler) {
        return await options.errorHandler(error);
      }

      throw error;
    }
  };
};
