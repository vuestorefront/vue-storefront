import {
  EndpointsConstraint,
  HTTPClient,
  MethodConfig,
  Methods,
  RequestConfig,
} from "./types";
import { isRequestConfig } from "./consts";
import { Connector } from "../../types";

/**
 * Connector for the SDK.
 * It's used to create the methods for the SDK.
 * Implements the Proxy pattern.
 */
export const connector = <Endpoints extends EndpointsConstraint>(
  httpClient: HTTPClient
) => {
  const target: Methods<Endpoints> = {} as Methods<Endpoints>;

  return new Proxy<Methods<Endpoints>>(target, {
    get: (_, endpoint) => {
      if (typeof endpoint !== "string") {
        return null;
      }

      return async (...params: any[]) => {
        let requestConfig: RequestConfig | undefined;
        const methodConfig: MethodConfig = params[params.length - 1];

        if (methodConfig?.[isRequestConfig]) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { [isRequestConfig]: omit, ...rest } = params.pop();
          requestConfig = rest;
        }

        return await httpClient(endpoint, { ...requestConfig, params });
      };
    },
  }) satisfies Connector;
};
