import { connector } from "./connector";
import { EndpointsConstraint, Options } from "./types";
import { getHttpClient } from "./utils";
import { Module } from "../../types";

/**
 * `connect` module is allowing to communicate with the Server Middleware API.
 *
 * It generates the methods to communicate with the API based on the provided endpoints interface.
 *
 * @example
 * Setup:
 * ```ts
 * import { createSdk } from "@vue-storefront/next";
 * import { connect } from "@vue-storefront/sdk";
 * import type { SapccEndpoints } from "../storefront-middleware/types";
 *
 * export const { getSdk } = createSdk(options, ({ buildModule }) => ({
 *   sapcc: buildModule(connect<SapccEndpoints>, {
 *     apiUrl: "http://localhost:4000/sapcc",
 *   }),
 * }));
 * ```
 *
 * It also exposes the `context` with the `httpClient` to allow to use the `httpClient` directly in extensions.
 * @example
 * Usage:
 * ```ts
 * import { createSdk } from "@vue-storefront/next";
 * import { connect } from "@vue-storefront/sdk";
 * import type { SapccEndpoints } from "../storefront-middleware/types";
 *
 * const extension = (extensionOptions, { methods, context }) => ({
 *   extend: {
 *     async newMethod(params) {
 *       const response = await context.httpClient("http://localhost:4000/sapcc/extended-endpoint", { params });
 *       const responseJson = await response.json();
 *       const products = await methods.getProducts(params);
 *       return { ...responseJson, ...products };
 *     }
 *   }
 * });
 *
 * export const { getSdk } = createSdk(options, ({ buildModule }) => ({
 *   sapcc: buildModule(connect<SapccEndpoints>, {
 *     apiUrl: "http://localhost:4000/sapcc",
 *   }, extension),
 * }));
 * ```
 */
export const connect = <Endpoints extends EndpointsConstraint>(
  options: Options
) => {
  const httpClient = getHttpClient(options);
  return {
    connector: connector<Endpoints>(httpClient),
    context: {
      httpClient,
    },
  } satisfies Module;
};
