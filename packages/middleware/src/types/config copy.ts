import { HelmetOptions } from "helmet";
import { Config } from "./base";
import { Extension } from "./exntensions";
import { CustomQueryFunction } from "./query";
import * as klevuApiClient from "../playground/klevu";

// Adding a generic type parameter ApiClientType to IntegrationConfig
export interface IntegrationConfig<ApiClientType = unknown> {
  location?: string;
  apiClient?: ApiClientType;
  configuration: Config;
  extensions?: (extensions: Extension[]) => Extension[];
  customQueries?: Record<string, CustomQueryFunction>;
  initConfig?: Config;
  errorHandler?: (error: unknown, req: Request, res: Response) => void;
}

// Adding a generic type parameter IntegrationConfigType to IntegrationsConfig
export type IntegrationsConfig<
  IntegrationConfigType extends IntegrationConfig = IntegrationConfig
> = Record<string, IntegrationConfigType>;

export interface MiddlewareConfig<
  IntegrationsConfigType extends IntegrationsConfig = IntegrationsConfig
> {
  integrations: IntegrationsConfigType;
  options?: {
    helmet?: boolean | HelmetOptions;
  };
}

export interface CreateServerParams<
  IntegrationsConfigType extends IntegrationsConfig = IntegrationsConfig
> {
  integrations: IntegrationsConfigType;
  helmet?: boolean | HelmetOptions;
}

export function defineConfig<
  IntegrationsConfigType extends IntegrationsConfig = IntegrationsConfig
>(
  config: MiddlewareConfig<IntegrationsConfigType>
): CreateServerParams<IntegrationsConfigType> {
  return {
    integrations: {
      ...config.integrations,
    },
    helmet: config.options?.helmet,
  };
}

// Here we are inferring the type of apiClient from klevuApiClient
export const newConfig = defineConfig({
  integrations: {
    klevu: {
      apiClient: klevuApiClient,
      configuration: {
        // TODO: verify type inference
      },
    },
  },
});
