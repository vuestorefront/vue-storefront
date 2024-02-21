/* eslint-disable @typescript-eslint/no-unused-vars */
import { Connector } from "../../types";
import { EndpointsConstraint } from "./types";

export const connector = <Endpoints extends EndpointsConstraint>() => {
  const target = {} as Endpoints;
  return new Proxy<Endpoints>(target, {
    get: (_, endpoint) => {
      return async (params: unknown[]) => {
        return {};
      };
    },
  }) satisfies Connector;
};
