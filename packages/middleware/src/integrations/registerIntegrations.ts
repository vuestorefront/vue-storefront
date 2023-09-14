import consola from "consola";
import type { Express } from "express";
import {
  createExtensions,
  createRawExtensions,
  getInitConfig,
  resolveDependency,
} from "./helpers";
// import type {
//   ApiClientFactory,
//   Integrations,
//   IntegrationsLoaded,
// } from "../deprecated/types";
import { defaultErrorHandler } from "../errors/defaultErrorHandler";
import {
  Integrations,
  BaseIntegrationsConfig,
  ApiClientFactoryResult,
} from "../types";

export async function registerIntegrations(
  app: Express,
  integrations: BaseIntegrationsConfig
): Promise<Integrations> {
  return await Object.entries(integrations).reduce(
    async (prevAsync, [tag, integrationConfig]) => {
      consola.info(`- Loading: ${tag} ${integrationConfig.location ?? ""}`);
      const prev = await prevAsync;

      let apiClientFactoryResult: ApiClientFactoryResult<any>;
      if (integrationConfig.location) {
        apiClientFactoryResult = resolveDependency<ApiClientFactoryResult<any>>(
          integrationConfig.location
        );
      }
      apiClientFactoryResult = integrationConfig.apiClient;

      const rawExtensions = createRawExtensions(
        apiClientFactoryResult,
        integrationConfig
      );
      const extensions = createExtensions(rawExtensions);
      const initConfig = await getInitConfig({
        apiClientFactoryResult,
        tag,
        integrationConfig,
      });
      const configuration = {
        ...integrationConfig.configuration,
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
          apiClient: apiClientFactoryResult,
          extensions,
          initConfig,
          configuration,
          customQueries: integrationConfig.customQueries,
          errorHandler: integrationConfig.errorHandler ?? defaultErrorHandler,
        },
      };
    },
    Promise.resolve({})
  );
}
