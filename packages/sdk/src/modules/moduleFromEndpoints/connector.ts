/* eslint-disable @typescript-eslint/no-unused-vars */
import { Connector } from "../../types";
import { getHTTPClient } from "./utils/getHttpClient";
import {
  EndpointsConstraint,
  Options,
  Methods,
  RequestConfig,
  MethodConfig,
} from "./types";
import { isRequestConfig } from "./consts";

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
