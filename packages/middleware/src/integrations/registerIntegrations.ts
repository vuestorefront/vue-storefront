import type { Express } from "express";
import {
  createExtensions,
  createRawExtensions,
  getInitConfig,
  resolveDependency,
} from "./helpers";
import type {
  ApiClientFactory,
  Integrations,
  IntegrationsLoaded,
} from "../types";
import { defaultErrorHandler } from "../errors/defaultErrorHandler";
import { LoggerManager, wrapLogger } from "../loggerManager";

export async function registerIntegrations(
  app: Express,
  integrations: Integrations,
  loggerManager: LoggerManager
): Promise<IntegrationsLoaded> {
  return await Object.entries(integrations).reduce(
    async (prevAsync, [tag, integration]) => {
      const rawLogger = loggerManager.get(tag);
      const logger = wrapLogger(rawLogger, () => ({
        context: "middleware",
      }));
      const alokai = { logger };
      logger.info(`- Loading: ${tag} ${integration.location}`);
      const prev = await prevAsync;
      const apiClient = resolveDependency<ApiClientFactory>(
        integration.location,
        alokai
      );
      const rawExtensions = createRawExtensions(apiClient, integration);
      const extensions = createExtensions(rawExtensions, alokai);
      const initConfig = await getInitConfig({
        apiClient,
        integration,
        tag,
        alokai,
      });
      const configuration = {
        ...integration.configuration,
        integrationName: tag,
      };

      for (const { name, extendApp } of extensions) {
        logger.info(`- Loading: ${tag} extension: ${name}`);

        if (extendApp) {
          const logger = wrapLogger(rawLogger, () => ({
            context: "middleware",
            scope: {
              extensionName: name,
              hookName: "extendApp",
            },
          }));
          await extendApp({ app, configuration, logger });
        }
      }

      logger.notice(`- Integration: ${tag} loaded!`);

      return {
        ...prev,
        [tag]: {
          apiClient,
          extensions,
          initConfig,
          configuration,
          customQueries: integration.customQueries,
          errorHandler: integration.errorHandler ?? defaultErrorHandler,
        },
      };
    },
    Promise.resolve({})
  );
}
