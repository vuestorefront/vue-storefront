import { lookUpExternal } from "./lookUpExternal";
// import type {
//   Integration,
//   ApiClientFactory,
//   ApiClientExtension,
//   ApiMethods,
//   TObject,
// } from "../../deprecated/types";
import {
  BaseExtension,
  ApiClientFactoryResult,
  BaseIntegrationConfig,
} from "../../types";

/**
 * Imports extensions if they're represented as strings.
 */
export function createExtensions(
  rawExtensions: (BaseExtension | string)[]
): BaseExtension[] {
  return rawExtensions.flatMap(lookUpExternal);
}

/**
 * Creates an array of extensions schemas or their paths.
 */
export function createRawExtensions(
  apiClientFactoryResult: ApiClientFactoryResult<any>,
  integration: BaseIntegrationConfig
): BaseExtension[] {
  const extensionsCreateFn = integration.extensions;
  const predefinedExtensions =
    apiClientFactoryResult.createApiClient._predefinedExtensions || [];

  return extensionsCreateFn
    ? extensionsCreateFn(predefinedExtensions)
    : predefinedExtensions;
}
