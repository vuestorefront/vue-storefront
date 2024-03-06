import { Connector } from "../../types";
import {
  EndpointsConstraint,
  Methods,
  RequestConfig,
  RequestSender,
} from "./types";
import { isConfig } from "./consts";

/**
 * SDK connector.
 * It's used to create the methods for the SDK.
 * Implements the Proxy pattern.
 */
export const connector = <Endpoints extends EndpointsConstraint>(
  requestSender: RequestSender
) => {
  const target = {} as Methods<Endpoints>;
  return new Proxy<Methods<Endpoints>>(target, {
    get: (_, methodName) => {
      if (typeof methodName !== "string") {
        throw new Error("Method must be a string");
      }

      return async (...params: any[]) => {
        let config: RequestConfig | undefined;
        const lastParam = params.at(-1);

        // If last parameter contains the `isRequestConfig` symbol, it's a request config
        if (typeof lastParam === "object" && lastParam?.[isConfig]) {
          // Remove the `isRequestConfig` symbol from the request config
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { [isConfig]: omit, ...rest } = params.pop();
          config = rest;
        }

        return requestSender(methodName, params, config);
      };
    },
  }) satisfies Connector;
};
