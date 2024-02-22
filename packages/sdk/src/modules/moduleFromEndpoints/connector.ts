/* eslint-disable @typescript-eslint/no-unused-vars */
import { Connector } from "../../types";
import {
  EndpointsConstraint,
  Methods,
  RequestConfig,
  MethodConfig,
  HTTPClient,
} from "./types";
import { isRequestConfig } from "./consts";

/**
 * Connector for the SDK.
 * It's used to create the methods for the SDK.
 * Implements the Proxy pattern.
 */
export const connector = <Endpoints extends EndpointsConstraint>(
  httpClient: HTTPClient
) => {
  const target = {} as Methods<Endpoints>;
  return new Proxy<Methods<Endpoints>>(target, {
    get: (_, methodName) => {
      if (typeof methodName !== "string") {
        throw new Error("Method must be a string");
      }

      return async (...params: any[]) => {
        let requestConfig: RequestConfig | undefined;
        const methodConfig: MethodConfig = params[params.length - 1];

        if (methodConfig?.[isRequestConfig]) {
          const { [isRequestConfig]: omit, ...rest } = params.pop();
          requestConfig = rest;
        }

        return httpClient(methodName, {
          ...requestConfig,
          params,
        });
      };
    },
  }) satisfies Connector;
};
