import { Request, Response } from "express";
import { BaseConfig, CustomQueryFunction } from "./common";
import { BaseExtension } from "./extensions";
import { BaseApiClient } from "./apiClientFactory";

export interface BaseIntegration {
  apiClient: BaseApiClient;
  initConfig: BaseConfig;
  configuration: BaseConfig & { integrationName: string };
  extensions: BaseExtension[];
  customQueries?: Record<string, CustomQueryFunction>;
  errorHandler: (error: unknown, req: Request, res: Response) => void;
}
