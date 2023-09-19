import { Context } from "vm";
import { Api, Client, Config, ApiMethodsFactory } from "./base";
import { ContextualizedApi } from "./context";
import { Extension } from "./exntensions";

// On Create Function Type

export type OnCreateFunction = (
  config: Config,
  headers?: Record<string, string>
) => { config: Config; client: Client };

// API Client Factory Types

export interface ApiClientFactoryParams {
  api: Api | ApiMethodsFactory;
  onCreate: OnCreateFunction;
  extensions?: Extension[];
  isProxy?: boolean;
}

// Utility Types

export type ConfigFromParams<
  ApiClientFactoryParamsType extends ApiClientFactoryParams
> = ReturnType<ApiClientFactoryParamsType["onCreate"]>["config"];

export type ClientFromParams<
  ApiClientFactoryParamsType extends ApiClientFactoryParams
> = ReturnType<ApiClientFactoryParamsType["onCreate"]>["client"];

export type MethodFromExtensions<
  ApiClientFactoryParamsType extends ApiClientFactoryParams
> = ApiClientFactoryParamsType["extensions"][number]["extendApiMethods"];

// Extended ApiClient Type

export interface ExtendedApiClient<
  ApiClientFactoryParamsType extends ApiClientFactoryParams
> {
  api: ApiClientFactoryParamsType["api"];
  client: ClientFromParams<ApiClientFactoryParamsType>;
  settings: ConfigFromParams<ApiClientFactoryParamsType>;
}

export type CreateApiClientFunction<
  ApiClientFactoryParamsType extends ApiClientFactoryParams
> = (
  middlewareContext: Context,
  config: ReturnType<ApiClientFactoryParamsType["onCreate"]>["config"],
  customApi?: ContextualizedApi
) => ExtendedApiClient<ApiClientFactoryParamsType>;

export interface ApiClientFactoryResult<
  ApiClientFactoryParamsType extends ApiClientFactoryParams
> {
  createApiClient: CreateApiClientFunction<ApiClientFactoryParamsType> & {
    _predefinedExtensions?: ApiClientFactoryParamsType["extensions"];
  };

  init?: (
    configuration: ReturnType<ApiClientFactoryParamsType["onCreate"]>["config"]
  ) => ReturnType<ApiClientFactoryParamsType["onCreate"]>["config"];
}
