import { lookUpExternal } from "./lookUpExternal";
import type {
  Integration,
  ApiClientFactory,
  ApiClientExtension,
  ApiMethods,
  TObject,
} from "../../types";

/**
 * Imports extensions if they're represented as strings.
 */
export function createExtensions(
  rawExtensions: (ApiClientExtension | string)[]
): ApiClientExtension[] {
  return rawExtensions.flatMap(lookUpExternal);
}

/**
 * Creates an array of extensions schemas or their paths.
 */
export function createRawExtensions<
  CONFIG extends TObject,
  API extends ApiMethods,
  CONTEXT extends TObject
>(
  apiClient: ApiClientFactory,
  integration: Integration<CONFIG, API, CONTEXT>
): ApiClientExtension<API, CONTEXT>[] {
  const extensionsCreateFn = integration.extensions;
  const predefinedExtensions =
    apiClient.createApiClient._predefinedExtensions || [];

  return extensionsCreateFn
    ? extensionsCreateFn(predefinedExtensions)
    : predefinedExtensions;
}
