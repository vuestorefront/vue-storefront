import { Express, Request, Response } from "express";
import { Config, ContextualizedApi } from "./index";

// Hooks Types

export interface BeforeCreateParams {
  configuration: Config;
}

export interface AfterCreateParams {
  configuration: Config;
}

export interface BeforeCallParams<ARGS = any> {
  configuration: Config;
  callName: string;
  args: ARGS;
}

export interface AfterCallParams<ARGS = any, RESPONSE = any> {
  configuration: Config;
  callName: string;
  args: ARGS;
  response: RESPONSE;
}

export interface ApiClientExtensionHooks {
  beforeCreate?: (params: BeforeCreateParams) => Config;
  afterCreate?: (params: AfterCreateParams) => Config;
  beforeCall?: <Args>(params: BeforeCallParams<Args>) => Args;
  afterCall?: <Args, Res>(params: AfterCallParams<Args, Res>) => Res;
}

export type Hooks = (req: Request, res: Response) => ApiClientExtensionHooks;

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
  hooks?: Hooks;
}
