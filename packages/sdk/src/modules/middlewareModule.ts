import type { Module, Connector, AnyFunction } from "../types";

const isRequestConfig = Symbol("requestConfig");

// === Interfaces ===
export type EndpointsConstraint = {
  [key: string]: AnyFunction;
};

export type EnforceEndpointsConstraint<T extends EndpointsConstraint> = T;

export interface RequestConfig {
  headers?: Record<string, string>;
  method?: "GET" | "POST";
  params?: any;
}

export interface MethodConfig extends RequestConfig {
  [isRequestConfig]: boolean;
}

export type HTTPClient = (url: string, config: RequestConfig) => Promise<any>;

export interface Options {
  apiUrl: string;
  ssrApiUrl?: string;
  httpClient?: HTTPClient;
  defaultRequestConfig?: RequestConfig;
  errorHandler?: (error: any) => any;
}

export type Methods<Endpoints extends EndpointsConstraint> = {
  [Key in keyof Endpoints]: (
    ...params: [...Parameters<Endpoints[Key]>, config?: MethodConfig]
  ) => ReturnType<Endpoints[Key]>;
};

export interface MiddlewareModule<Endpoints extends EndpointsConstraint>
  extends Module {
  connector: Methods<Endpoints>;
}

export type ApiClientMethodsToEndpoints<
  ApiClientMethods extends EndpointsConstraint
> = {
  [T in keyof ApiClientMethods]: ApiClientMethods[T] extends (
    context: any,
    ...arguments_: infer P
  ) => infer R
    ? (...arguments_: P) => R
    : never;
};

// === Helpers ===

export const prepareConfig = <
  CustomConfig extends RequestConfig = RequestConfig
>(
  requestConfig: CustomConfig
): MethodConfig => {
  return {
    ...requestConfig,
    [isRequestConfig]: true,
  };
};

// === HTTP Client abstraction ===

const getHttpClient = (options: Options): HTTPClient => {
  const getHeaders = (requestConfig?: RequestConfig) => {
    return {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(options.defaultRequestConfig?.headers ?? {}),
      ...(requestConfig?.headers ?? {}),
    };
  };

  const getUrl = (path: string): string => {
    // Determine the base URL based on the environment
    const baseUrl =
      typeof window === "undefined"
        ? options.ssrApiUrl || options.apiUrl
        : options.apiUrl;

    // Ensure the base URL ends with a slash
    const normalizedBaseUrl = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;

    return `${normalizedBaseUrl}${path}`;
  };

  const defaultHttpClient: HTTPClient = async (url, config) => {
    const response = await fetch(url, {
      ...config,
      body: JSON.stringify(config.params),
      credentials: "include",
    });
    return response.json();
  };

  const defaultErrorHandler = (error: any) => {
    throw error;
  };

  const httpClient: HTTPClient = options.httpClient || defaultHttpClient;

  return (url, config) => {
    const headers = getHeaders(config);
    const fullUrl = getUrl(url);
    const method = config.method || "POST";

    try {
      return httpClient(fullUrl, { ...config, method, headers });
    } catch (error) {
      const errorHandler = options.errorHandler ?? defaultErrorHandler;
      return errorHandler(error);
    }
  };
};

// === Connector ===

const middlewareConnector = <Endpoints extends EndpointsConstraint>(
  httpClient: HTTPClient
): Methods<Endpoints> => {
  return new Proxy({} as Methods<Endpoints>, {
    get: (_, endpoint) => {
      if (typeof endpoint !== "string") {
        return null;
      }

      return async (...params: any[]) => {
        let requestConfig: RequestConfig | undefined;
        if ((params[params.length - 1] as MethodConfig)?.[isRequestConfig]) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { [isRequestConfig]: omit, ...rest } = params.pop();
          requestConfig = rest;
        }

        return await httpClient(endpoint, { ...requestConfig, params });
      };
    },
  }) satisfies Connector;
};

// === Module ===

export const middlewareModule = <Endpoints extends EndpointsConstraint>(
  options: Options
): MiddlewareModule<Endpoints> => {
  const httpClient = getHttpClient(options);
  return {
    connector: middlewareConnector<Endpoints>(httpClient),
    context: {
      httpClient,
    },
  };
};
