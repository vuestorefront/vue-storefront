import { HelmetOptions } from "helmet";
import { ApiClientFactoryResult } from "./apiClientFactory";
import { BaseConfig, CustomQueryFunction } from "./common";
import { BaseExtension } from "./extensions";
import { BaseContext } from "./context";

export type AnyApiClient = ApiClientFactoryResult<any>;

export interface BaseIntegrationConfig {
  /**
   * @deprecated
   * Use `apiClient` instead.
   */
  location?: string;
  apiClient?: AnyApiClient;
  configuration: BaseConfig;
  extensions?: (extensions: BaseExtension[]) => BaseExtension[];
  customQueries?: Record<string, CustomQueryFunction>;
  initConfig?: BaseConfig;
  errorHandler?: (error: unknown, req: Request, res: Response) => void;
}

export type BaseIntegrationsConfig = Record<string, BaseIntegrationConfig>;

export type OmitFirstArg<F> = F extends (arg1: any, ...args: infer A) => infer R
  ? (...args: A) => R
  : never;

export type RemoveContextFromAPI<APIType> = {
  [K in keyof APIType]: OmitFirstArg<APIType[K]>;
};

export interface OrchestrationContext<
  IntegrationsConfig extends BaseIntegrationsConfig
> extends Omit<BaseContext, "integrations"> {
  extensions: ReturnType<
    IntegrationsConfig[keyof IntegrationsConfig]["extensions"]
  >;
  customQueries: IntegrationsConfig[keyof IntegrationsConfig]["customQueries"];
  getApiClient: <K extends keyof IntegrationsConfig>(
    key: K
  ) => {
    api: RemoveContextFromAPI<
      ReturnType<IntegrationsConfig[K]["apiClient"]["createApiClient"]>["api"]
    >; // TODO: Add extensions here
  } & Omit<
    ReturnType<IntegrationsConfig[K]["apiClient"]["createApiClient"]>,
    "api"
  >;
}

export interface OrchestrationMethods<
  IntegrationsConfig extends BaseIntegrationsConfig
> {
  [key: string]: (
    context: OrchestrationContext<IntegrationsConfig>,
    params: any
  ) => any;
}

export interface MiddlewareConfig<
  IntegrationsConfig extends BaseIntegrationsConfig
> {
  integrations: IntegrationsConfig;
  orchestration?: OrchestrationMethods<IntegrationsConfig>;
  /**
   * @deprecated
   * Use `options.helmet` instead.
   */
  helmet?: boolean | HelmetOptions;
  options?: {
    helmet?: boolean | HelmetOptions;
  };
}
