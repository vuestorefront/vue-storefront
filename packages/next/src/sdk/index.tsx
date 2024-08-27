import {
  composeMiddlewareUrl,
  defaultMethodsRequestConfig,
  type CreateSdkOptions,
} from "@storefront/shared";
import { buildModule, initSDK, middlewareModule } from "@vue-storefront/sdk";
import { resolveDynamicContext } from "./helpers";
import { Config, CreateSdkReturn, GetSdkContext } from "./types";

export type { CreateSdkOptions } from "@storefront/shared";

/**
 * Creates an SDK for the given configuration definition.
 * @param options - The options for creating the SDK.
 * @param configDefinition - The configuration definition for the SDK.
 * @returns An object containing the `getSdk` function.
 * @example
 * ```tsx
 * import { contentfulModule } from "@vsf-enterprise/contentful-sdk";
 * import { CreateSdkOptions, createSdk } from "@vue-storefront/next";
 * import type { UnifiedApiEndpoints } from "../storefront-middleware/types";
 *
 * const options: CreateSdkOptions = {
 *   middleware: {
 *     apiUrl: "http://localhost:4000",
 *     ssrApiUrl: "http://localhost:4000",
 *     cdnCacheBustingId: "no-cache-busting-id-set",
 *   },
 *   multistore: {
 *    enabled: false,
 *   },
 * };
 *
 * export const { getSdk, createSdkContext } = createSdk(
 *   options,
 *   ({ buildModule, middlewareModule, config, getRequestHeaders }) => ({
 *     unified: buildModule(middlewareModule<UnifiedApiEndpoints>, {
 *       apiUrl: config.middlewareUrl + "/commerce",
 *       cdnCacheBustingId: config.cdnCacheBustingId,
 *       defaultRequestConfig: {
 *         headers: getRequestHeaders(),
 *       },
 *       methodsRequestConfig: config.defaultMethodsRequestConfig.unifiedCommerce.middlewareModule,
 *     }),
 *     contentful: buildModule(contentfulModule, {
 *       apiUrl: config.middlewareUrl + "/cntf",
 *     }),
 *   }),
 * );
 * ```
 */
export function createSdk<TConfig extends Record<string, any>>(
  options: CreateSdkOptions,
  configDefinition: Config<TConfig>
): CreateSdkReturn<TConfig> {
  function getSdk(dynamicContext: GetSdkContext = {}) {
    const { getRequestHeaders } = resolveDynamicContext(dynamicContext);
    const middlewareUrl = composeMiddlewareUrl({
      options,
      headers: getRequestHeaders(),
    });

    const resolvedConfig = configDefinition({
      defaults: defaultMethodsRequestConfig,
      buildModule,
      middlewareModule,
      getRequestHeaders,
      middlewareUrl,
      config: {
        middlewareUrl,
        defaultMethodsRequestConfig: defaultMethodsRequestConfig,
        cdnCacheBustingId:
          options.middleware.cdnCacheBustingId ?? "no-cache-busting-id-set",
      },
    });

    return initSDK(resolvedConfig);
  }

  return {
    getSdk,
  };
}

/**
 * Creates a configuration definition for the SDK.
 * @param config The configuration definition for the SDK.
 * @returns An object containing SDK configuration
 * @example
 * ```tsx
 * const config = defineSdkConfig(
 *   ({ buildModule, middlewareModule, config, getRequestHeaders }) => ({
 *     unified: buildModule(middlewareModule<UnifiedApiEndpoints>, {
 *       apiUrl: config.middlewareUrl + "/commerce",
 *       cdnCacheBustingId: config.cdnCacheBustingId,
 *       defaultRequestConfig: {
 *         headers: getRequestHeaders(),
 *       },
 *       methodsRequestConfig: config.defaultMethodsRequestConfig.unifiedCommerce.middlewareModule,
 *     }),
 *     contentful: buildModule(contentfulModule, {
 *       apiUrl: config.middlewareUrl + "/cntf",
 *     }),
 *   })
 * );
 */
export function defineSdkConfig<TConfig extends Record<string, any>>(
  config: Config<TConfig>
) {
  return config;
}

type ResolveSdkOptionsConfig = {
  customSuffix: string;
};

/**
 * Helper function to resolve the SDK options based on the configuration.
 * @param input - The options for creating the SDK.
 * @param options - The configuration object, that allows to customize the API Url creation on enabled multistore.
 * @returns The resolved SDK options.
 */
export function resolveSdkOptions(
  input: CreateSdkOptions,
  options: Partial<ResolveSdkOptionsConfig> = {}
): CreateSdkOptions {
  if (input?.multistore?.enabled) {
    return {
      middleware: {
        // This is a dummy URL, the localhost domain will be replaced by the actual domain in the browser
        // in composeMiddlewareUrl function. The server-side rendering will use ssrApiUrl.
        apiUrl: `https://localhost/${options?.customSuffix ?? "api"}`,
        cdnCacheBustingId: input.middleware?.cdnCacheBustingId,
        ssrApiUrl: input.middleware?.ssrApiUrl ?? input.middleware.apiUrl,
      },
      multistore: {
        enabled: true,
      },
    };
  }

  return input;
}
