import { HelmetOptions } from "helmet";
import { Client, Config } from "./base";
import { Extension } from "./exntensions";
import { CustomQueryFunction } from "./query";
import { OrchestrationMethods } from "./orchestration";

// Integration Config Types

export interface IntegrationConfig {
  location?: string;
  apiClient?: Client;
  configuration: Config;
  extensions?: (extensions: Extension[]) => Extension[];
  customQueries?: Record<string, CustomQueryFunction>;
  initConfig?: Config;
  errorHandler?: (error: unknown, req: Request, res: Response) => void;
}

export type IntegrationsConfig = Record<string, IntegrationConfig>;

// Middleware Types

export interface MiddlewareConfig<
  IntegrationsConfigType extends IntegrationsConfig
> {
  integrations: IntegrationsConfigType;
  orchestration?: OrchestrationMethods<IntegrationsConfigType>;
  options?: {
    helmet?: boolean | HelmetOptions;
  };
}

export interface CreateServerParams {
  integrations: IntegrationsConfig;
  helmet?: boolean | HelmetOptions;
}
