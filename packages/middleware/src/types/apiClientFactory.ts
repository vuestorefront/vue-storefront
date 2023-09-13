import { BaseConfig, BaseClient } from "./common";
import {
  BaseContext,
  ContextualizedApi,
  ContextualizedMethodFactory,
} from "./context";
import { BaseExtension } from "./extensions";

// BaseTypes

export type BaseOnCreateFn = (
  config: BaseConfig,
  headers?: Record<string, string>
) => { config: BaseConfig; client: BaseClient };

export interface BaseApiClientFactoryParams {
  api: ContextualizedApi | ContextualizedMethodFactory;
  onCreate: BaseOnCreateFn;
  extensions?: BaseExtension[];
  isProxy?: boolean;
}

export interface BaseApiClient {
  api: ContextualizedApi | ContextualizedMethodFactory;
  client: BaseClient;
  settings: BaseConfig;
}

// Utils

export type ConfigFromParams<
  ApiClientFactoryParams extends BaseApiClientFactoryParams
> = ReturnType<ApiClientFactoryParams["onCreate"]>["config"];

export type ClientFromParams<
  ApiClientFactoryParams extends BaseApiClientFactoryParams
> = ReturnType<ApiClientFactoryParams["onCreate"]>["client"];

export type MethodsFromExtensions<
  ApiClientFactoryParams extends BaseApiClientFactoryParams
> = ApiClientFactoryParams["extensions"][number]["extendApiMethods"];

// ApiClientFactory

interface ApiClient<ApiClientFactoryParams extends BaseApiClientFactoryParams>
  extends BaseApiClient {
  api: ApiClientFactoryParams["api"] &
    MethodsFromExtensions<ApiClientFactoryParams>;
  client: ClientFromParams<ApiClientFactoryParams>;
  settings: ConfigFromParams<ApiClientFactoryParams>;
}

export type CreateApiClientFn<
  ApiClientFactoryParams extends BaseApiClientFactoryParams
> = (
  middlewareContext: BaseContext,
  config: ConfigFromParams<ApiClientFactoryParams>,
  customApi?: ContextualizedApi // Note: customApi is being accepted but it's never being passed during the initialization...
) => ApiClient<ApiClientFactoryParams>;

export interface ApiClientFactoryResult<
  ApiClientFactoryParams extends BaseApiClientFactoryParams
> {
  createApiClient: CreateApiClientFn<ApiClientFactoryParams> & {
    _predefinedExtensions?: ApiClientFactoryParams["extensions"];
  };

  init?: (
    configuration: ConfigFromParams<ApiClientFactoryParams>
  ) => ConfigFromParams<ApiClientFactoryParams>;
}
