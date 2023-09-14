import { ApiClient } from "./apiClientFactory";
import { Config } from "./base";
import { IntegrationsConfig } from "./config";
import { Extension } from "./exntensions";
import { CustomQueryFunction } from "./query";

// Context Types

export interface Context {
  req: Request;
  res: Response;
  extensions?: Extension[];
  customQueries?: Record<string, CustomQueryFunction>;
  integrations: IntegrationsConfig;
  getApiClient: (name: string) => ApiClient;
}

// Contextualized Types

export type ContextualizedApi = Record<
  string,
  (context: Context, params: any) => any
>;

export type ContextualizedMethodFactory = (config: Config) => ContextualizedApi;
