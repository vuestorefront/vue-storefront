import { markExtensionNameHelpers } from "../../apiClientFactory/markExtensionNameHelpers";

/**
 * Resolves the api function from the apiClientPromise based on the extensionName and functionName parameters.
 *
 * @param apiClientPromise
 * @param reqParams
 *
 * @returns Tuple containing resolved function and name of extension it comes from if any
 */
export const getApiFunction = async (
  apiClientPromise: Promise<any> | any,
  functionName: string,
  extensionName?: string
) => {
  try {
    const apiClient = await apiClientPromise;

    const apiFn = extensionName
      ? apiClient?.api?.[extensionName]?.[functionName]
      : apiClient?.api?.[functionName];

    if (!apiFn) {
      const errorMessage = extensionName
        ? `Extension "${extensionName}" is not namespaced or the function "${functionName}" is not available in the namespace.`
        : `The function "${functionName}" is not registered.`;
      throw new Error(errorMessage);
    }
    return [apiFn, markExtensionNameHelpers.get(apiFn)];
  } catch (error) {
    const e = new Error(
      `Failed to resolve apiClient or function: ${error.message}`
    );
    if (error.errorBoundary) {
      Object.assign(e, { errorBoundary: error.errorBoundary });
    }
    throw e;
  }
};
