// import { Express, Request, Response } from "express";
// import type { HelmetOptions } from "helmet";

// export interface Helmet extends HelmetOptions {
//   helmet?: boolean | HelmetOptions;
// }

// export interface IntegrationConfig {
//   integration?: ApiClientFactoryResult<any>;
//   location?: string;
//   configuration: BaseConfig;
//   extensions?: BaseExtension[];
// }

// export type BaseIntegrationsConfig = Record<string, IntegrationConfig>;

// export type OmitFirstArg<F> = F extends (arg1: any, ...args: infer A) => infer R
//   ? (...args: A) => R
//   : never;

// export type RemoveContextFromAPI<APIType> = {
//   [K in keyof APIType]: OmitFirstArg<APIType[K]>;
// };

// export interface OrchestrationMethods<
//   IntegrationsConfig extends BaseIntegrationsConfig
// > {
//   [key: string]: (
//     context: MiddlewareContext<IntegrationsConfig>,
//     params: any
//   ) => any;
// }

// export interface MiddlewareConfig<
//   IntegrationsConfig extends BaseIntegrationsConfig
// > {
//   integrations: IntegrationsConfig;
//   orchestration?: OrchestrationMethods<IntegrationsConfig>;
//   helmet?: boolean | Readonly<HelmetOptions>;
// }

// // ------------------------------

export type BaseMethod = (...args: any[]) => any;

export type BaseApi = Record<string, BaseMethod>;

export type BaseConfig = Record<string, any>;

export type BaseMethodFactory = (config: BaseConfig) => BaseApi;

export type BaseClient = any;

// // ------------------------------


// // ------------------------------

export type OnCreateFn = (
  config: BaseConfig,
  headers?: Record<string, string>
) => { config: BaseConfig; client: BaseClient };

export interface BaseApiClientFactoryParams {
  api: BaseApi | BaseMethodFactory;
  onCreate: OnCreateFn;
  extensions?: any[];
  isProxy?: boolean;
}


export type ConfigFromParams<
  ApiClientFactoryParams extends BaseApiClientFactoryParams
> = ReturnType<ApiClientFactoryParams["onCreate"]>["config"];

export type ClientFromParams<
  ApiClientFactoryParams extends BaseApiClientFactoryParams
> = ReturnType<ApiClientFactoryParams["onCreate"]>["client"];

// ------------------------------

// export interface IntegrationLoaded<
//   ApiClientFactoryParams extends BaseApiClientFactoryParams = any
// > {
//   apiClient: ApiClientFactoryResult<ApiClientFactoryParams>;
//   initConfig: ConfigFromParams<ApiClientFactoryParams>;
//   configuration: ConfigFromParams<ApiClientFactoryParams>;
//   extensions?: ApiClientFactoryParams["extensions"];
//   customQueries?: Record<string, CustomQueryFunction>;
//   errorHandler: (error: unknown, req: Request, res: Response) => void;
// }

// export type IntegrationsLoaded = Record<string, IntegrationLoaded>;

// export interface MiddlewareContext<
//   IntegrationsConfig extends BaseIntegrationsConfig = any
// > {
//   req: Request;
//   res: Response;
//   extensions?: BaseExtension[];
//   customQueries?: Record<string, CustomQueryFunction>;
//   integrations: IntegrationsConfig;
//   getApiClient: <K extends keyof IntegrationsConfig>(
//     key: K
//   ) => {
//     api: RemoveContextFromAPI<
//       ReturnType<IntegrationsConfig[K]["integration"]["createApiClient"]>["api"]
//     >;
//   } & Omit<
//     ReturnType<IntegrationsConfig[K]["integration"]["createApiClient"]>,
//     "api"
//   >;
// }

// ------------------------------

export type NewCreateApiClientFn<
  ApiClientFactoryParams extends BaseApiClientFactoryParams
> = (
  middlewareContext: any, // TODO: verify if this is the correct type
  config: ConfigFromParams<ApiClientFactoryParams>,
  customApi?: BaseApi // Note: customApi is being accepted but it's never being passed during the initialization...
) => {
  api: ApiClientFactoryParams["api"]; // TODO: Add method from extensions to this type
  client: ClientFromParams<ApiClientFactoryParams>;
  settings: ConfigFromParams<ApiClientFactoryParams>;
};

export interface ApiClientFactoryResult<
  ApiClientFactoryParams extends BaseApiClientFactoryParams
> {
  createApiClient: NewCreateApiClientFn<ApiClientFactoryParams> & {
    _predefinedExtensions?: ApiClientFactoryParams["extensions"];
  };
  init?: (
    configuration: ConfigFromParams<ApiClientFactoryParams>
  ) => ConfigFromParams<ApiClientFactoryParams>;
}
