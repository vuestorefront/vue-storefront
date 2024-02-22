import { Module } from "../../types";
import { connector } from "./connector";
import { EndpointsConstraint, Options } from "./types";

export const moduleFromEndpoints = <Endpoints extends EndpointsConstraint>(
  options: Options
) =>
  ({
    connector: connector<Endpoints>(options),
  } satisfies Module);
