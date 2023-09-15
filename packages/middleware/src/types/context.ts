import { Request, Response } from "express";
import { ApiClient } from "./apiClientFactory";
import { Config } from "./base";
import { IntegrationsLoaded } from "./integrations";
import { Extension } from "./exntensions";
import { CustomQueryFunction } from "./query";

// Context Types

export interface Context {
  req: Request;
  res: Response;
  extensions?: Extension[];
  customQueries?: Record<string, CustomQueryFunction>;
  integrations: IntegrationsLoaded;
  getApiClient: (name: string) => ApiClient;
}

// Contextualized Types

export type ContextualizedApi = Record<
  string,
  (context: Context, params: any) => any
>;

export type ContextualizedMethodFactory = (config: Config) => ContextualizedApi;
