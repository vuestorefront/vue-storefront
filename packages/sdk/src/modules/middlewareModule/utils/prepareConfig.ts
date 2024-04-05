import { isConfig } from "../consts";
import { RequestConfig, MethodConfig } from "../types";

/**
 * Prepare the config for the request.
 * It's used to differentiate the method config from the params.
 *
 * @example
 * Usage
 * ```ts
 * import { prepareConfig } from "@vue-storefront/sdk";
 *
 * const products = sdk.commerce.getProducts(params, prepareConfig({ method: "GET" }));
 * ```
 */
export const prepareConfig = (requestConfig: RequestConfig): MethodConfig => {
  return {
    ...requestConfig,
    [isConfig]: true,
  };
};
