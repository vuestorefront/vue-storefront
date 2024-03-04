import {
  Options,
  IncomingConfig,
  BaseConfig,
  ComputedConfig,
  HTTPClient,
} from "../types";

export const getHTTPClient = (options: Options) => {
  const { apiUrl, ssrApiUrl, defaultRequestConfig = {} } = options;

  const getUrl = (
    path: string,
    method: BaseConfig["method"],
    params: any[]
  ): string => {
    // Determine the base URL based on the environment
    const baseUrl =
      typeof window === "undefined" ? ssrApiUrl || apiUrl : apiUrl;

    // Ensure the base URL ends with a slash.
    // TODO: Update eslint rule to warn on prefer-template instead of error.
    // eslint-disable-next-line prefer-template
    const normalizedBaseUrl = baseUrl.replace(/\/+$/, "") + "/";
    const url = `${normalizedBaseUrl}${path}`;

    // If there are no query params, return the URL as is
    if (method !== "GET") {
      return url;
    }

    // If there are query params, append them to the URL as `?body=[<strignified query params>]`
    const serializedParams = encodeURIComponent(JSON.stringify(params));

    return `${url}?body=${serializedParams}`;
  };

  const getConfig = (config: IncomingConfig): ComputedConfig => {
    const { method, headers } = config;
    const defaultHeaders = {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...defaultRequestConfig.headers,
    };
    const mergedHeaders = {
      ...defaultHeaders,
      ...headers,
    };

    const computedHeaders: ComputedConfig["headers"] = {};
    Object.entries(mergedHeaders).forEach(([key, value]) => {
      computedHeaders[key] = Array.isArray(value) ? value.join(",") : value;
    });

    return {
      ...config,
      method,
      headers: {
        ...computedHeaders,
      },
    };
  };

  const defaultHTTPClient: HTTPClient = async (
    url: string,
    params: any[],
    config?: ComputedConfig
  ) => {
    const response = await fetch(url, {
      ...config,
      body: JSON.stringify(params),
    });

    return response.json();
  };

  return async (methodName: string, params: any[], config?: IncomingConfig) => {
    const { httpClient = defaultHTTPClient } = options;
    const { method = "POST", headers = {}, ...restConfig } = config ?? {};
    const computedParams = method === "GET" ? [] : params;

    return httpClient(
      getUrl(methodName, method, params),
      computedParams,
      getConfig({ method, headers, ...restConfig })
    );
  };
};
