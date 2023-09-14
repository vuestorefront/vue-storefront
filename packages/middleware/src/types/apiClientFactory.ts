import { Context } from "vm";
import { Client, Config } from "./base";
import { ContextualizedApi, ContextualizedMethodFactory } from "./context";
import { Extension } from "./exntensions";

// On Create Function Type

export type OnCreateFunction = (
  config: Config,
  headers?: Record<string, string>
) => { config: Config; client: Client };

// API Client Factory Types

export interface ApiClientFactoryParams {
  api: ContextualizedApi | ContextualizedMethodFactory;
  onCreate: OnCreateFunction;
  extensions?: Extension[];
  isProxy?: boolean;
}

export interface ApiClient {
  api: ContextualizedApi | ContextualizedMethodFactory;
  client: Client;
  settings: Config;
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
> extends ApiClient {
  api: ApiClientFactoryParamsType["api"] &
    MethodFromExtensions<ApiClientFactoryParamsType>;
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
