import { Connector } from "../../types";
import { getHTTPClient } from "./utils/getHttpClient";
import { EndpointsConstraint, Options, Methods, IncomingConfig } from "./types";
import { isConfig } from "./consts";

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

        // If last parameter contains the `isRequestConfig` symbol, it's a request config
        if (params.at(-1)?.[isConfig]) {
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
