import { Module } from "../../types";
import { connector } from "./connector";
import { EndpointsConstraint, Options } from "./types";
import { getRequestSender } from "./utils";

/**
 * `middlewareModule` is allowing to communicate with the Server Middleware API.
 *
 * It generates the methods to communicate with the API based on the provided endpoints interface.
 *
 * @example
 * Setup:
 * ```ts
 * import { createSdk } from "@vue-storefront/next";
 * import type { SapccEndpoints } from "../storefront-middleware/types";
 *
 * export const { getSdk } = createSdk(options, ({ buildModule, middlewareModule }) => ({
 *   sapcc: buildModule(middlewareModule<SapccEndpoints>, {
 *     apiUrl: "http://localhost:4000/sapcc",
 *   }),
 * }));
 * ```
 *
 * It also exposes the `context` with the `requestSender` to allow to use it directly in extensions.
 *
 * @example
 * Usage:
 * ```ts
 * import { createSdk } from "@vue-storefront/next";
 * import type { SapccEndpoints } from "../storefront-middleware/types";
 *
 * const extension = (extensionOptions, { methods, context }) => ({
 *   extend: {
 *     async newMethod(params) {
 *       const response = await context.requestSender("customMethod", [params]);
 *       const products = await methods.getProducts(params);
 *       return { ...response, ...products };
 *     }
 *   }
 * });
 *
 * export const { getSdk } = createSdk(options, ({ buildModule, middlewareModule }) => ({
 *   sapcc: buildModule(middlewareModule<SapccEndpoints>, {
 *     apiUrl: "http://localhost:4000/sapcc",
 *   }, extension),
 * }));
 * ```
 */
export const middlewareModule = <Endpoints extends EndpointsConstraint>(
  options: Options<Endpoints>
) => {
  const requestSender = getRequestSender(options);

  return {
    connector: connector<Endpoints>(requestSender),
    context: {
      requestSender,
    },
  } satisfies Module;
};
