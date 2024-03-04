import { Connector } from "../../types";
import { getHTTPClient } from "./utils/getHttpClient";
import { EndpointsConstraint, Options, Methods, IncomingConfig } from "./types";
import { isConfig } from "./consts";

/**
 * SDK connector.
 * It's used to create the methods for the SDK.
 * Implements the Proxy pattern.
 */
export const connector = <Endpoints extends EndpointsConstraint>(
  options: Options
) => {
  const httpClient = getHTTPClient(options);
  const target = {} as Methods<Endpoints>;
  return new Proxy<Methods<Endpoints>>(target, {
    get: (_, methodName) => {
      if (typeof methodName !== "string") {
        throw new Error("Method must be a string");
      }

      return async (...params: any[]) => {
        let config: IncomingConfig | undefined;
        const lastParam = params.at(-1);

        // If last parameter contains the `isRequestConfig` symbol, it's a request config
        if (typeof lastParam === "object" && lastParam?.[isConfig]) {
          // Remove the `isRequestConfig` symbol from the request config
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { [isConfig]: omit, ...rest } = params.pop();
          config = rest;
        }

        return httpClient(methodName, params, config);
      };
    },
  }) satisfies Connector;
};
