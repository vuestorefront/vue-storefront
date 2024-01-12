/**
 * Resolves the api function from the apiClient based on the extensionName and functionName parameters.
 *
 * @param apiClient
 * @param reqParams
 */
export const getApiFunction = (
  apiClient: any,
  functionName: string,
  extensionName?: string
) => {
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
};
