import { Request, Response } from "express";
import { BaseExtension } from "./extensions";
import { BaseIntegration } from "./integrations";
import { CustomQueryFunction, BaseConfig } from "./common";
import { BaseApiClient } from "./apiClientFactory";

export interface BaseContext {
  req: Request;
  res: Response;
  extensions?: BaseExtension[];
  customQueries?: Record<string, CustomQueryFunction>;
  integrations: BaseIntegration[];
  getApiClient: (name: string) => BaseApiClient;
}

export type ContextualizedApi = Record<
  string,
  (context: BaseContext, params: any) => any
>;

export type ContextualizedMethodFactory = (
  config: BaseConfig
) => ContextualizedApi;
