import { Express, Request, Response } from "express";
import { BaseConfig } from "./common";
import { ContextualizedApi } from "./context";

export interface ExtendAppParams {
  app: Express;
  configuration: BaseConfig;
}
export type ExtendAppFn = (params: ExtendAppParams) => Promise<void>;

export interface WithConfiguration {
  configuration: BaseConfig;
}
export interface WithCallName {
  callName: string;
}
export interface WithArgs<ARGS = any> {
  args: ARGS;
}
export interface WithResponse<RESPONSE = any> {
  response: RESPONSE;
}
export type BeforeCreateParams = WithConfiguration;
export type AfterCreateParams = WithConfiguration;
export type BeforeCallParams<ARGS> = WithConfiguration &
  WithCallName &
  WithArgs<ARGS>;
export type AfterCallParams<ARGS, RESPONSE> = WithConfiguration &
  WithCallName &
  WithArgs<ARGS> &
  WithResponse<RESPONSE>;

export interface BaseApiClientExtensionHooks {
  beforeCreate?: (params: BeforeCreateParams) => BaseConfig;
  afterCreate?: (params: AfterCreateParams) => BaseConfig;
  beforeCall?: <Args>(params: BeforeCallParams<Args>) => Args;
  afterCall?: <Args, Res>(params: AfterCallParams<Args, Res>) => Res;
}

export type BaseHooks = (
  req: Request,
  res: Response
) => BaseApiClientExtensionHooks;

export interface BaseExtension {
  name: string;
  extendApiMethods?: ContextualizedApi;
  extendApp?: ExtendAppFn;
  hooks?: BaseHooks;
}
