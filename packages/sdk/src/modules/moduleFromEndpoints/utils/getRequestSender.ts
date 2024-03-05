import {
  Options,
  RequestConfig,
  BaseConfig,
  ComputedConfig,
  HTTPClient,
  ErrorHandler,
  RequestSender,
} from "../types";

/**
 * Generates a `RequestSender` function configured according to the provided options.
 *
 * @remarks
 * This function abstracts away the details of constructing request URLs, merging configurations,
 * handling errors, and executing HTTP requests.
 */
export const getRequestSender = (options: Options): RequestSender => {
  const { apiUrl, ssrApiUrl, defaultRequestConfig = {} } = options;

  const getUrl = (
    path: string,
    method: BaseConfig["method"],
    params: unknown[]
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

  const getConfig = (config: RequestConfig): ComputedConfig => {
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
    params: unknown[],
    config?: ComputedConfig
  ) => {
    const response = await fetch(url, {
      ...config,
      body: JSON.stringify(params),
      credentials: "include",
    });

    return response.json();
  };

  const defaultErrorHandler: ErrorHandler = async ({ error }) => {
    throw error;
  };

  return async (methodName, params, config?) => {
    const {
      httpClient = defaultHTTPClient,
      errorHandler = defaultErrorHandler,
    } = options;
    const { method = "POST", headers = {}, ...restConfig } = config ?? {};
    const computedParams = method === "GET" ? [] : params;
    const finalUrl = getUrl(methodName, method, params);
    const finalConfig = getConfig({ method, headers, ...restConfig });

    try {
      return await httpClient(finalUrl, computedParams, finalConfig);
    } catch (error) {
      return await errorHandler({
        error,
        methodName,
        url: finalUrl,
        params: computedParams,
        config: finalConfig,
        httpClient,
      });
    }
  };
};
