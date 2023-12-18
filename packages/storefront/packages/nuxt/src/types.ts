export interface MiddlewareConfig {
  /**
   * The URL of the middleware.
   * @example "http://localhost:4000"
   */
  apiUrl: string;
  /**
   * The URL of the middleware for server-side rendering.
   * @example "http://localhost:4000"
   */
  ssrApiUrl?: string;
}

export interface MultistoreConfig {
  /**
   * Whether the multistore is enabled or not.
   * @example false
   * @default false
   */
  enabled: boolean;
}

export interface SdkModuleOptions {
  middleware: MiddlewareConfig;
  multistore?: MultistoreConfig;
}
