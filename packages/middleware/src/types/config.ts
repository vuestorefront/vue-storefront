import { HelmetOptions } from "helmet";
import { Config } from "./base";
import { Extension } from "./exntensions";
import { CustomQueryFunction } from "./query";
import { OrchestrationMethods } from "./orchestration";
import { ApiClientFactoryResult } from "./apiClientFactory";

// Integration Config Types

export interface IntegrationConfig {
  location?: string;
  apiClient?: ApiClientFactoryResult<any>;
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

// Api Client Types

type OptionalExtensions<Extensions extends Extension[]> =
  Extensions extends Extension[] ? Extensions : [];

export interface ApiClientConfig<
  ApiClientType extends ApiClientFactoryResult<any>,
  ExtensionType extends Extension
> extends Omit<IntegrationConfig, "location"> {
  apiClient: ApiClientType;
  configuration: ReturnType<ApiClientType["createApiClient"]>["settings"];
  extensions?: (
    extensions: OptionalExtensions<
      ApiClientType["createApiClient"]["_predefinedExtensions"]
    >
  ) => ExtensionType[];
}
