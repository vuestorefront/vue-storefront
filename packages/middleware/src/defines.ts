import {
  ApiClient,
  ApiClientExtension,
  ApiMethods,
  LoggerOptions,
  TObject,
  WithoutContext,
} from "./types";

const metaSymbol = Symbol("__meta");

export const createDefineConfig: CreateDefineConfig = () => {
  return {
    defineConfig: (config) => config as any,
  };
};

export type GetApiClient<MiddlewareConfig extends TObject> = <
  K extends keyof MiddlewareConfig["integrations"]
>(
  integrationName: K & string
) => Promise<
  ApiClient<
    MiddlewareConfig["integrations"][K][typeof metaSymbol]["api"] &
      ExtractExtensionMethods<
        ReturnType<
          MiddlewareConfig["integrations"][K][typeof metaSymbol]["extensions"]
        >
      >,
    MiddlewareConfig["integrations"][K][typeof metaSymbol]["config"],
    MiddlewareConfig["integrations"][K][typeof metaSymbol]["client"]
  >
>;

type ApiClientExtensionsCallback<
  Config extends TObject,
  Api extends ApiMethods,
  Context extends TObject,
  CoreExtensions extends ApiClientExtension<Api, Context, Config>[]
> = (extensions: CoreExtensions) => ApiClientExtension<Api, Context, Config>[];

/**
 * I don't like this type - it's a duplicate of the existing
 * Integration from `@vue-storefront/middleware`.
 */
type IntegrationConfig<
  Config extends TObject,
  Api extends ApiMethods,
  Context extends TObject,
  CoreExtensions extends ApiClientExtension<Api, Context, Config>[],
  ExtensionsCallback extends ApiClientExtensionsCallback<
    Config,
    Api,
    Context,
    CoreExtensions
  >
> = {
  location: string;
  configuration: Config;
  extensions?: ExtensionsCallback;
  logger?: LoggerOptions;
};

interface IntegrationConfigMeta<
  Config extends TObject,
  Api extends ApiMethods,
  Context extends TObject,
  Client extends TObject,
  CoreExtensions extends ApiClientExtension<Api, Context, Config>[],
  ExtensionsCallback extends ApiClientExtensionsCallback<
    Config,
    Api,
    Context,
    CoreExtensions
  >
> {
  [metaSymbol]: {
    client: Client;
    config: Config;
    api: Api;
    extensions: ExtensionsCallback;
  };
}

type IntegrationConfigWithMeta<
  Config extends TObject,
  Api extends ApiMethods,
  Context extends TObject,
  Client extends TObject,
  CoreExtensions extends ApiClientExtension<Api, Context, Config>[],
  ExtensionsCallback extends ApiClientExtensionsCallback<
    Config,
    Api,
    Context,
    CoreExtensions
  >
> = IntegrationConfig<
  Config,
  Api,
  Context,
  CoreExtensions,
  ExtensionsCallback
> &
  IntegrationConfigMeta<
    Config,
    Api,
    Context,
    Client,
    CoreExtensions,
    ExtensionsCallback
  >;

type ExtractExtensionMethods<T extends readonly ApiClientExtension[]> = {
  [K in T[number] as K["extendApiMethods"] extends TObject
    ? K["isNamespaced"] extends true
      ? K["name"]
      : keyof K["extendApiMethods"]
    : never]: K["extendApiMethods"] extends TObject
    ? K["isNamespaced"] extends true
      ? WithoutContext<K["extendApiMethods"]>
      : WithoutContext<K["extendApiMethods"]>[keyof K["extendApiMethods"]]
    : never;
};

type CreateDefineConfig = <
  Config extends TObject,
  Api extends TObject,
  Context extends TObject,
  CoreExtensions extends ApiClientExtension<Api, Context, Config>[],
  Client extends TObject
>() => {
  defineConfig: <
    ExtensionsCallback extends ApiClientExtensionsCallback<
      Config,
      Api,
      Context,
      CoreExtensions
    >
  >(
    config: IntegrationConfig<
      Config,
      Api,
      Context,
      CoreExtensions,
      ExtensionsCallback
    >
  ) => IntegrationConfigWithMeta<
    Config,
    Api,
    Context,
    Client,
    CoreExtensions,
    ExtensionsCallback
  >;
};
