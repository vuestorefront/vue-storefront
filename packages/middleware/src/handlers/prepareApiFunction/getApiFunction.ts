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
  return (
    apiClient?.api?.[extensionName]?.[functionName] ??
    apiClient?.api?.[functionName]
  );
};
