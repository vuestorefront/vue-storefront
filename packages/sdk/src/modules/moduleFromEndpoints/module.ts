import { Module } from "../../types";
import { connector } from "./connector";
import { EndpointsConstraint } from "./types";

export const moduleFromEndpoints = <Endpoints extends EndpointsConstraint>() =>
  ({
    connector: connector<Endpoints>(),
  } satisfies Module);
