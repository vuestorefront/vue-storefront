import {
  composeMiddlewareUrl,
  type CreateSdkOptions,
} from "@storefront/shared";
import { buildModule, initSDK } from "@vue-storefront/sdk";
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
 * import {
 *   contentfulModule,
 *   ContentfulModuleType,
 * } from "@vsf-enterprise/contentful-sdk";
 * import { unifiedModule } from "@vsf-enterprise/unified-sdk";
 * import { CreateSdkOptions, createSdk } from "@vue-storefront/next";
 * import type { UnifiedApiExtension } from "../storefront-middleware/middleware.config";
 *
 * const options: CreateSdkOptions = {
 *   middleware: {
 *     apiUrl: "http://localhost:4000",
 *   },
 * };
 *
 * export const { getSdk, createSdkContext } = createSdk(
 *   options,
 *   ({ buildModule, middlewareUrl, getRequestHeaders }) => ({
 *     unified: buildModule(unifiedModule<UnifiedApiExtension>, {
 *       apiUrl: middlewareUrl + "/commerce",
 *       requestOptions: {
 *         headers: getRequestHeaders,
 *       },
 *     }),
 *     contentful: buildModule<ContentfulModuleType>(contentfulModule, {
 *       apiUrl: middlewareUrl + "/cntf",
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
      buildModule,
      getRequestHeaders,
      middlewareUrl,
    });

    return initSDK(resolvedConfig);
  }

  return {
    getSdk,
  };
}
