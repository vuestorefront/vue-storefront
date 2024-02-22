/* eslint-disable @typescript-eslint/no-unused-vars */
import { Connector } from "../../types";
import { getHTTPClient } from "./getHttpClient";
import { EndpointsConstraint, Options } from "./types";

export const connector = <Endpoints extends EndpointsConstraint>(
  options: Options
) => {
  const httpClient = getHTTPClient(options);
  const target = {} as Endpoints;
  return new Proxy<Endpoints>(target, {
    get: (_, methodName) => {
      if (typeof methodName !== "string") {
        throw new Error("Method must be a string");
      }

      return async (...params: unknown[]) => {
        return httpClient(methodName, {
          params,
        });
      };
    },
  }) satisfies Connector;
};
