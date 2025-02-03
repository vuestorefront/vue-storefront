import CircuitBreaker from "opossum";
import { markExtensionNameHelpers } from "../../apiClientFactory/markExtensionNameHelpers";

function getCircuitBreakerBuilder(transparent = false) {
  const breakerMap = new Map<string, CircuitBreaker<any, any>>();
  return {
    buildCircuitBreaker: (name, callback, settings) => {
      if (transparent) return callback;

      if (!breakerMap.has(name)) {
        /**
         * https://nodeshift.dev/opossum/#circuitbreaker
         */
        breakerMap.set(
          name,
          new CircuitBreaker(callback, {
            name,
            rollingCountTimeout: 5000,
            errorThresholdPercentage: 50,
            resetTimeout: 5000,
            volumeThreshold: 3,
            ...settings,
          })
        );
      }

      return breakerMap.get(name).fire.bind(breakerMap.get(name));
    },
  };
}

const { buildCircuitBreaker } = getCircuitBreakerBuilder(false);

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

    const breakerName = [
      apiClient.settings.circuitBreaker.runId,
      apiClient.settings.integrationName,
      extensionName,
      functionName,
    ]
      .filter(Boolean)
      .join("-");
    const resolvedApiFn = buildCircuitBreaker(
      breakerName,
      apiFn,
      apiClient.settings.circuitBreaker
    );

    return [resolvedApiFn, markExtensionNameHelpers.get(apiFn)];
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
