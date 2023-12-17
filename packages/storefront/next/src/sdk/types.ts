import { buildModule } from "@vue-storefront/sdk";

export interface MiddlewareConfig {
  apiUrl: string;
  ssrApiUrl?: string;
}

export interface MultistoreConfig {
  enabled: boolean;
}

export interface CreateSdkOptions {
  multistore?: MultistoreConfig;
  middleware: MiddlewareConfig;
}

export type GetSdkContext = {
  getRequestHeaders?: () =>
    | Record<string, string | string[] | undefined>
    | Headers;
};

export type DynamicContext = {
  getRequestHeaders: () => Record<string, string | string[]>;
};

export type StaticContext = {
  buildModule: typeof buildModule;
  middlewareUrl: string;
};

type InjectedContext = DynamicContext & StaticContext;

export type Config<TConfig> = (context: InjectedContext) => TConfig;
