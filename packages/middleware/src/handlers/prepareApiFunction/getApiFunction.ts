/**
 * Resolves the api function from the apiClientPromise based on the extensionName and functionName parameters.
 *
 * @param apiClientPromise
 * @param reqParams
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
    return apiFn;
  } catch (error) {
    throw new Error(
      `Failed to resolve apiClient or function: ${error.message}`
    );
  }
};
