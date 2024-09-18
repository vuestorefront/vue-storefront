import {
  Options,
  RequestConfig,
  BaseConfig,
  ComputedConfig,
  HTTPClient,
  ErrorHandler,
  RequestSender,
  Logger,
} from "../types";
import { SdkHttpError } from "./SdkHttpError";
import { defaultLogger } from "./defaultLogger";

/**
 * Generates a `RequestSender` function configured according to the provided options.
 *
 * @remarks
 * This function abstracts away the details of constructing request URLs, merging configurations,
 * handling errors, and executing HTTP requests.
 */
export const getRequestSender = (options: Options): RequestSender => {
  const {
    apiUrl,
    ssrApiUrl,
    defaultRequestConfig = {},
    methodsRequestConfig = {},
    cdnCacheBustingId = undefined,
  } = options;

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
    const serializedBody = encodeURIComponent(JSON.stringify(params));
    // Serialize CDN cache busting ID
    const serializedCdnCacheBustingId = cdnCacheBustingId
      ? `&cdnCacheBustingId=${encodeURIComponent(cdnCacheBustingId)}`
      : "";

    return `${url}?body=${serializedBody}${serializedCdnCacheBustingId}`;
  };

  const getConfig = (
    config: RequestConfig,
    methodConfig: RequestConfig
  ): ComputedConfig => {
    const { method, headers } = config;
    const { headers: methodHeaders = {} } = methodConfig;
    const defaultHeaders = {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...defaultRequestConfig.headers,
    };
    const mergedHeaders = Object.fromEntries(
      Object.entries({
        ...defaultHeaders,
        ...methodHeaders,
        ...headers,
      }).reduce<[string, string | string[]][]>(
        (headersSoFar, [key, value]) =>
          // Removing Content-Lenght header if it equals 0 because it would crash Next.js server
          // eslint-disable-next-line eqeqeq
          key.toLocaleLowerCase() === "content-length" && value == "0"
            ? headersSoFar
            : [...headersSoFar, [key, value]],
        []
      )
    );

    const computedHeaders: ComputedConfig["headers"] = {};
    Object.entries(mergedHeaders).forEach(([key, value]) => {
      computedHeaders[key] = Array.isArray(value) ? value.join(";") : value;
    });

    return {
      ...config,
      method,
      headers: {
        ...computedHeaders,
      },
    };
  };

  const getLogger = (logger: Options["logger"]): Logger => {
    if (logger === true) return defaultLogger;
    if (logger === false) return {};
    if (!logger)
      return process.env.ALOKAI_SDK_DEBUG === "true" ? defaultLogger : {};

    return logger;
  };

  const defaultHTTPClient: HTTPClient = async (url, params, config) => {
    const response = await fetch(url, {
      ...config,
      body: config?.method === "GET" ? undefined : JSON.stringify(params),
      credentials: "include",
    });

    const responseJson = await response.json().catch(() => undefined);

    if (!response.ok) {
      const message = `${config?.method} ${url} ${
        responseJson?.message ?? response.statusText
      }`;

      throw new SdkHttpError({
        statusCode: response.status,
        message,
        url,
      });
    }

    return responseJson;
  };

  const defaultErrorHandler: ErrorHandler = async ({ error }) => {
    throw error;
  };

  return async (methodName, params, config?) => {
    const {
      httpClient = defaultHTTPClient,
      errorHandler = defaultErrorHandler,
    } = options;
    const logger = getLogger(options.logger);
    const { method, headers = {}, ...restConfig } = config ?? {};
    const methodConfig = methodsRequestConfig[methodName] || {};
    const finalMethod =
      method || methodConfig.method || defaultRequestConfig.method || "POST";
    const finalUrl = getUrl(methodName, finalMethod, params);
    const finalParams = finalMethod === "GET" ? [] : params;
    const finalConfig = getConfig(
      { method: finalMethod, headers, ...restConfig },
      methodConfig
    );
    const startTime = performance.now();
    logger.onRequest?.({
      config: finalConfig,
      params,
      url: finalUrl,
    });

    try {
      const response = await httpClient(finalUrl, finalParams, finalConfig);
      const responseTime = performance.now() - startTime;
      logger.onResponse?.({
        config: finalConfig,
        params,
        response,
        responseTime,
        url: finalUrl,
      });
      return response;
    } catch (error) {
      return await errorHandler({
        error,
        methodName,
        url: finalUrl,
        params: finalParams,
        config: finalConfig,
        httpClient,
      });
    }
  };
};
