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
  /**
   * This is identifier used to invalidate the cache on CDN when the assets change.
   * Usually it's a commit hash.
   * @example "2c106d9619c71c3082c9b59b1d72817363c8ecb9"
   * @default "no-cache-busting-id-set"
   */
  cdnCacheBustingId?: string;
}

export interface MultistoreConfig {
  /**
   * Whether the multistore is enabled or not.
   * @example false
   * @default false
   */
  enabled: boolean;
}

export interface CreateSdkOptions {
  multistore?: MultistoreConfig;
  middleware: MiddlewareConfig;
}
