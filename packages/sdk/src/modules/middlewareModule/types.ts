import { AnyFunction } from "../../types";
import { isConfig } from "./consts";

/**
 * Represents the constraint for API endpoint functions within the SDK.
 * Each endpoint function must return a Promise, allowing for asynchronous operations.
 *
 * @example
 * ```typescript
 * // Definition of an API endpoint structure
 * type Endpoints = {
 *   getUser: ({ id: string }) => Promise<User>;
 *   createUser: (userDetails: CreateUserDetails) => Promise<User>;
 * };
 * ```
 */
export type EndpointsConstraint = {
  [key: string]: AnyFunction;
};

/**
 * Base configuration object for HTTP requests. It includes essential configurations like the HTTP method.
 *
 * @remarks
 * This type serves as a base for more detailed configuration objects by specifying
 * the method of the HTTP request.
 */
export type BaseConfig = {
  /**
   * The HTTP method for the request. Optional. Can be "GET" or "POST".
   * @default "POST"
   */
  method?: "GET" | "POST";

  /**
   * Additional properties for the configuration object.
   */
  [key: string]: any;
};

/**
 * User-defined configuration for HTTP requests, extending `BaseConfig`.
 * Allows custom headers, supporting both strings and arrays of strings for header values.
 */
export type RequestConfig = BaseConfig & {
  /**
   * Optional custom headers. Keys are header names, values can be a string or an array of strings.
   */
  headers?: Record<string, string | string[]>;
};

/**
 * Computed configuration for HTTP requests, derived from `RequestConfig`.
 * Normalizes header values to strings for consistent request formatting.
 */
export type ComputedConfig = BaseConfig & {
  /**
   * Normalized headers for the HTTP request, ensuring all values are strings.
   */
  headers?: Record<string, string>;
};

/**
 * Configuration specific to a method, merging `RequestConfig` with an internal flag.
 * Indicates that the configuration is ready for making a request.
 */
export type MethodConfig = RequestConfig & {
  /**
   * Internal flag to mark the configuration as specific to a request.
   */
  [isConfig]: boolean;
};

/**
 * Represents a function type for sending HTTP requests, abstracting the complexity of request configuration.
 *
 * @remarks
 * This type is created via a factory function that configures it with common settings, such as base URLs and default headers.
 *
 * It simplifies making HTTP requests by handling URL construction, parameter serialization, and applying default and overridden configurations.
 */
export type RequestSender = (
  /**
   * Name of the SDK method that was called to make the HTTP request.
   */
  methodName: string,

  /**
   * The parameters of the method that was called to make the HTTP request.
   */
  params: unknown[],

  /**
   * User-defined configuration for the HTTP request.
   */
  config?: RequestConfig
) => Promise<any>;

/**
 * A customizable HTTP client function for making HTTP requests.
 *
 * @remarks This type represents a flexible interface for HTTP clients within the SDK, allowing for
 * customization and substitution of different HTTP request mechanisms (e.g., Fetch API, Axios).
 */
export type HTTPClient = (
  /**
   * The URL for the HTTP request.
   */
  url: string,

  /**
   * The parameters for the POST HTTP request.
   */
  params: unknown[],

  /**
   * The computed configuration for the HTTP request, after processing url, query params and headers.
   */
  config?: ComputedConfig
) => Promise<any>;

/**
 * Provides context for error handling, encapsulating details relevant to the failed HTTP request.
 */
export type ErrorHandlerContext = {
  /**
   * The error that was thrown during the HTTP request.
   */
  error: unknown;
  /**
   * The name of the method that was called to make the HTTP request.
   */
  methodName: string;
  /**
   * The URL of the HTTP request that resulted in an error.
   */
  url: string;
  /**
   * The parameters passed to the HTTP POST request.
   * @remarks
   * This is only relevant for POST requests, as GET requests do not have a body.
   * Query parameters are part of the URL and are not included here.
   */
  params: unknown[];
  /**
   * The computed configuration used for the HTTP request, after processing user inputs.
   */
  config: ComputedConfig;
  /**
   * The HTTP client function that was used to make the request.
   * @remarks
   * This allows for possible retry logic or logging.
   */
  httpClient: HTTPClient;
};

/**
 * Payload for the `onRequest` logger.
 */
export type OnRequestPayload = {
  /** Request config */
  config: ComputedConfig;
  /** Request params */
  params: unknown[];
  /** Request full url */
  url: string;
};

/**
 * Payload for the `onResponse` logger.
 */
export type OnResponsePayload = {
  /** Request config */
  config: ComputedConfig;
  /** Request params */
  params: unknown[];
  response: unknown;
  /** Time in miliseconds */
  responseTime: number;
  /** Request full url */
  url: string;
};

/**
 * Custom logger for the middlewareModule, allowing for request and response logging.
 */
export type Logger = {
  onRequest?: (payload: OnRequestPayload) => void;
  onResponse?: (payload: OnResponsePayload) => void;
};

/**
 * Defines a generic error handler function type. This abstraction allows for custom error handling logic,
 * which can be implemented by the consumer of the HTTP client.
 */
export type ErrorHandler = (context: ErrorHandlerContext) => Promise<any>;

/**
 * Options for the `middlewareModule`.
 */
export type Options<
  Endpoints extends EndpointsConstraint = EndpointsConstraint
> = {
  /**
   * Base URL for the API.
   */
  apiUrl: string;

  /**
   * Base URL for the API in the server side rendering.
   *
   * @remarks
   * It's optional and it will use the `apiUrl` if it's not provided.
   *
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
   * @remarks
   * It's optional and it will use the default HTTP Client if it's not provided.
   *
   * @example
   * Using `axios` as the HTTP Client:
   * ```ts
   * import axios from "axios";
   *
   * const options: Options = {
   *   apiUrl: "https://api.example.com",
   *   httpClient: async (url, params, config) => {
   *     try {
   *       const { data } = await axios(url, {
   *         ...config,
   *         data: params,
   *         withCredentials: true,
   *       });
   *
   *       return data;
   *     } catch (err: any) {
   *       throw new SdkHttpError({
   *         statusCode: err?.response?.status || 500,
   *         message: err?.response?.data?.message || err.message,
   *         cause: err,
   *       });
   *     }
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
   * Default request confguration for each method.
   */
  methodsRequestConfig?: Partial<Record<keyof Endpoints, RequestConfig>>;

  /**
   * An optional custom error handler for HTTP requests.
   *
   * @remarks
   * If not provided, errors will be thrown as is.
   *
   * This enables custom error handling, like retrying the request or refreshing tokens, depending on the error type and details of the request that failed.
   *
   * @example
   * ```typescript
   * const options: Options = {
   *   apiUrl: "https://api.example.com",
   *   errorHandler: async ({ error, methodName, url, params, config, httpClient }) => {
   *     if (error.status === 401 && methodName !== "login") {
   *       // Refresh token
   *       await refreshToken();
   *       // Retry the request
   *       return httpClient(url, params, config);
   *     }
   *
   *     throw error;
   *   },
   * };
   * ```
   */
  errorHandler?: ErrorHandler;

  /**
   * Unique identifier for CDN cache busting.
   */
  cdnCacheBustingId?: string;

  /**
   * Logger for the module. It can be a boolean to enable/disable the default logger or a custom logger.
   *
   * @default true if the `ALOKAI_SDK_DEBUG` environment variable is set to `true`, otherwise `false`.
   *
   * @example
   * Enable the default logger
   *
   * ```typescript
   * const options: Options = {
   *   apiUrl: "https://api.example.com",
   *   logger: true,
   * };
   * ```
   *
   * @example
   * Disable the default logger, even if the `ALOKAI_SDK_DEBUG` environment variable is set to `true`
   *
   * ```typescript
   * const options: Options = {
   *   apiUrl: "https://api.example.com",
   *   logger: false,
   * };
   * ```
   *
   * @example
   * Use a custom logger
   *
   * ```typescript
   * const options: Options = {
   *   apiUrl: "https://api.example.com",
   *   logger: {
   *     request: (payload) => {
   *       console.log("Request", JSON.stringify(payload));
   *     },
   *     response: (payload) => {
   *       console.log("Response", JSON.stringify(payload));
   *     },
   *   },
   * };
   * ```
   */
  logger?: boolean | Logger;
};

/**
 * Final type for the SDK methods.
 *
 * It requires the `Endpoints` interface to be provided.
 *
 * Based on this interface it will generate the methods with the correct parameters and return types.
 *
 * To each endpoint, it will add the `config` parameter with the `MethodConfig` type.
 */
export type Methods<Endpoints extends EndpointsConstraint> = {
  [Key in keyof Endpoints]: (
    ...params: [...Parameters<Endpoints[Key]>, config?: MethodConfig]
  ) => ReturnType<Endpoints[Key]>;
};
