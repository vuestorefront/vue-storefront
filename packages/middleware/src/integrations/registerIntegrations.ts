import consola from "consola";
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

export async function registerIntegrations(
  app: Express,
  integrations: Integrations
): Promise<IntegrationsLoaded> {
  return await Object.entries(integrations).reduce(
    async (prevAsync, [tag, integration]) => {
      consola.info(`- Loading: ${tag} ${integration.location}`);
      const prev = await prevAsync;
      const apiClient = resolveDependency<ApiClientFactory>(
        integration.location
      );
      const rawExtensions = createRawExtensions(apiClient, integration);
      const extensions = createExtensions(rawExtensions);
      const initConfig = await getInitConfig({ apiClient, integration, tag });
      const configuration = {
        ...integration.configuration,
        integrationName: tag,
      };

      for (const { name, extendApp } of extensions) {
        consola.info(`- Loading: ${tag} extension: ${name}`);

        if (extendApp) {
          await extendApp({ app, configuration });
        }
      }

      consola.success(`- Integration: ${tag} loaded!`);

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
