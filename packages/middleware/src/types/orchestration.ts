import { Request, Response } from "express";
import { IntegrationConfig, IntegrationsConfig } from "./config";
import { RemoveContextFromAPI } from "./utility";
import { ApiClient } from "./apiClientFactory";

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never;

// Additional type to support getApiClient method in OrchestrationContext
export interface ApiClientWithMethods<
  IntegrationConfigType extends IntegrationConfig
> extends Omit<ApiClient, "api"> {
  api: UnionToIntersection<
    RemoveContextFromAPI<
      ReturnType<IntegrationConfigType["apiClient"]["createApiClient"]>["api"] &
        ReturnType<
          IntegrationConfigType["extensions"]
        >[number]["extendApiMethods"]
    >
  >;
}

// Orchestration Types

export interface OrchestrationContext<
  IntegrationsConfigType extends IntegrationsConfig
> {
  req: Request;
  res: Response;
  extensions: ReturnType<
    IntegrationsConfigType[keyof IntegrationsConfigType]["extensions"]
  >;
  customQueries: IntegrationsConfigType[keyof IntegrationsConfigType]["customQueries"];
  getApiClient: <K extends keyof IntegrationsConfigType>(
    key: K
  ) => ApiClientWithMethods<IntegrationsConfigType[K]>;
}

export interface OrchestrationMethods<
  IntegrationsConfigType extends IntegrationsConfig
> {
  [key: string]: (
    context: OrchestrationContext<IntegrationsConfigType>,
    params: any
  ) => any;
}
