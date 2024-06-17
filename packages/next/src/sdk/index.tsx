import {
  composeMiddlewareUrl,
  contextConfig,
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
 *   },
 * };
 *
 * export const { getSdk, createSdkContext } = createSdk(
 *   options,
 *   ({ buildModule, middlewareModule, middlewareUrl, getRequestHeaders }) => ({
 *     unified: buildModule(middlewareModule<UnifiedApiEndpoints>, {
 *       apiUrl: middlewareUrl + "/commerce",
 *       defaultRequestConfig: {
 *         headers: getRequestHeaders(),
 *       },
 *     }),
 *     contentful: buildModule(contentfulModule, {
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
  function getSdk(dynamicContext: GetSdkContext = { }) {
    const { getRequestHeaders } = resolveDynamicContext(dynamicContext);
    const middlewareUrl = composeMiddlewareUrl({
      options,
      headers: getRequestHeaders(),
    });

    const resolvedConfig = configDefinition({
      defaults: contextConfig,
      buildModule,
      middlewareModule,
      getRequestHeaders,
      middlewareUrl,
      config: {
        middlewareUrl,
        defaults: contextConfig,
      }
    });

    return initSDK(resolvedConfig);
  }

  return {
    getSdk,
  };
}
