import { lookUpExternal } from "./lookUpExternal";
import {
  Extension,
  ApiClientFactoryResult,
  IntegrationConfig,
} from "../../types";

/**
 * Imports extensions if they're represented as strings.
 */
export function createExtensions(
  rawExtensions: (Extension | string)[]
): Extension[] {
  return rawExtensions.flatMap(lookUpExternal);
}

/**
 * Creates an array of extensions schemas or their paths.
 */
export function createRawExtensions(
  apiClientFactoryResult: ApiClientFactoryResult<any>,
  integration: IntegrationConfig
): Extension[] {
  const extensionsCreateFn = integration.extensions;
  const predefinedExtensions =
    apiClientFactoryResult.createApiClient._predefinedExtensions || [];

  return extensionsCreateFn
    ? extensionsCreateFn(predefinedExtensions)
    : predefinedExtensions;
}
