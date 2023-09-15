// Loaded integration

import { ApiClientFactoryResult } from "./apiClientFactory";
import { Config } from "./base";
import { Extension } from "./exntensions";
import { CustomQueryFunction } from "./query";

export interface IntegrationLoaded {
  apiClient: ApiClientFactoryResult<any>;
  initConfig: Config;
  configuration: Config;
  extensions: Extension[];
  customQueries?: Record<string, CustomQueryFunction>;
  errorHandler: (error: unknown, req: Request, res: Response) => void;
}

export interface IntegrationsLoaded {
  [integrationName: string]: IntegrationLoaded;
}
