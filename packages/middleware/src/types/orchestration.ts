import { Context } from "vm";
import { IntegrationConfig, IntegrationsConfig } from "./config";
import { RemoveContextFromAPI } from "./utility";

// Additional type to support getApiClient method in OrchestrationContext
export type ApiClientWithMethods<
  IntegrationConfigType extends IntegrationConfig
> = {
  api: RemoveContextFromAPI<
    ReturnType<IntegrationConfigType["apiClient"]["createApiClient"]>["api"]
  >;
} & Omit<
  ReturnType<IntegrationConfigType["apiClient"]["createApiClient"]>,
  "api"
>;

// Orchestration Types

export interface OrchestrationContext<
  IntegrationsConfigType extends IntegrationsConfig
> extends Omit<Context, "integrations"> {
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
