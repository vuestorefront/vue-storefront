import { Express, Request, Response } from "express";
import { ApiClientFactoryResult } from "./apiClientFactory";
import { Config } from "./base";
import { ContextualizedApi } from "./context";

// Hooks Types

export interface BeforeCreateParams {
  configuration: Config;
}

export interface AfterCreateParams {
  configuration: Config;
}

export interface BeforeCallParams<Args = any> {
  configuration?: Config;
  callName: string;
  args: Args;
}

export interface AfterCallParams<Args = any, Res = any> {
  configuration?: Config;
  callName: string;
  args: Args;
  response: Res;
}

export interface Hooks {
  beforeCreate?: (params: BeforeCreateParams) => Config;
  afterCreate?: (params: AfterCreateParams) => Config;
  beforeCall?: <Args>(params: BeforeCallParams<Args>) => Args;
  afterCall?: <Args, Res>(params: AfterCallParams<Args, Res>) => Res;
}

export type ApiClientExtensionHooks = (req: Request, res: Response) => Hooks;

// Extension Types

export interface ExtendAppParams {
  app: Express;
  configuration: Config;
}

export type ExtendAppFunction = (params: ExtendAppParams) => Promise<void>;

export interface Extension {
  name: string;
  extendApiMethods?: ContextualizedApi;
  extendApp?: ExtendAppFunction;
  hooks?: ApiClientExtensionHooks; // | Hooks -> TODO: Verify;
}

// Predefined Extensions Helpers

export type PredefinedExtensions<
  ApiClientType extends ApiClientFactoryResult<any>
> =
  ApiClientType["createApiClient"]["_predefinedExtensions"] extends Extension[]
    ? ApiClientType["createApiClient"]["_predefinedExtensions"]
    : [];
