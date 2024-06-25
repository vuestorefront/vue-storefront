/**
 * Type alias for any store configuration.
 */
export type StoreConfig = Record<string, any>;

/**
 * Utility for typing functions which can be defined as either async or sync.
 */
type MaybePromise<T> = T | Promise<T>;

/**
 * Cache manager is responsible for caching configuration and retreiving configuration from cache.
 */
export interface CacheManager {
  /**
   * Gets a store configuration from cache storage based on the `key` value.
   */
  get(key: string): MaybePromise<StoreConfig | undefined>;

  /**
   * Sets a store configuration in the cache storage with identifier equals `key` value.
   */
  set(key: string, value: StoreConfig): MaybePromise<unknown>;
}

/**
 * Extension methods defined in the middleware multistore configuration.
 */
export interface MultistoreExtensionMethods {
  /**
   * Cache manager factory creates cache manager.
   */
  cacheManagerFactory: () => CacheManager;

  /**
   * Overwrites base configuration with store configuration.
   */
  mergeConfigurations: (params: {
    baseConfig: StoreConfig;
    storeConfig: StoreConfig;
  }) => StoreConfig;

  /**
   * Fetches configuration from external service.
   */
  fetchConfiguration: (params: {
    domain: string;
  }) => MaybePromise<Record<string, StoreConfig>>;
}

/**
 * Parameters for updateConfig utility function.
 */
export interface FetchConfigWithCacheParams {
  /**
   * Cache manager.
   */
  cacheManager: CacheManager;

  /**
   * Domain of the request.
   */
  domain: string;

  /**
   * Extension methods defined in the middleware multistore configuration.
   */
  multistore: MultistoreExtensionMethods;
}
