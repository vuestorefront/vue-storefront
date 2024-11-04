import type { Express } from "express";
import {
  createExtensions,
  createRawExtensions,
  getInitConfig,
  resolveDependency,
} from "./helpers";
import type {
  AlokaiContainer,
  ApiClientFactory,
  Integrations,
  Integration,
  IntegrationsLoaded,
  ApiClientExtension,
} from "../types";
import { defaultErrorHandler } from "../errors/defaultErrorHandler";
import { LoggerManager, getLogger, injectMetadata } from "../logger";

function buildAlokaiContainer(
  tag: string,
  loggerManager: LoggerManager
): AlokaiContainer {
  const logger = loggerManager.get(tag);
  const loggerWithMetadata = injectMetadata(logger, () => ({
    alokai: {
      context: "middleware",
    },
  }));
  return { logger: loggerWithMetadata };
}

async function triggerExtendAppHook(
  tag: string,
  extensions: ApiClientExtension[],
  app: Express,
  configuration: unknown,
  alokai: AlokaiContainer
) {
  const logger = getLogger(alokai);
  for (const { name, extendApp } of extensions) {
    logger.debug(`- Loading: ${tag} extension: ${name}`);

    if (extendApp) {
      const loggerWithMetadata = injectMetadata(logger, () => ({
        alokai: {
          scope: {
            integrationName: tag,
            extensionName: name,
            type: "bootstrapHook",
            hookName: "extendApp",
          },
        },
      }));
      try {
        await extendApp({ app, configuration, logger: loggerWithMetadata });
      } catch (e) {
        const loggerWithErrorBoundary = injectMetadata(
          loggerWithMetadata,
          () => ({
            alokai: {
              errorBoundary: {
                integrationName: tag,
                extensionName: name,
                type: "bootstrapHook",
                hookName: "extendApp",
              },
            },
          })
        );
        loggerWithErrorBoundary.error(e);
        throw e;
      }
    }
  }
}

async function loadIntegration(
  tag: string,
  integration: Integration,
  app: Express,
  alokai: AlokaiContainer
) {
  const apiClient = resolveDependency<ApiClientFactory>(
    integration.location,
    alokai
  );
  const rawExtensions = createRawExtensions(apiClient, integration);
  const extensions = createExtensions(rawExtensions, alokai);
  const loggerWithMetadata = injectMetadata(getLogger(alokai), () => ({
    alokai: {
      scope: {
        hookName: "init",
        type: "bootstrapHook",
        integrationName: tag,
      },
    },
  }));
  const initConfig = await getInitConfig({
    apiClient,
    integration,
    tag,
    alokai: {
      ...alokai,
      logger: loggerWithMetadata,
    },
  });
  const configuration = {
    ...integration.configuration,
    integrationName: tag,
  };

  await triggerExtendAppHook(tag, extensions, app, configuration, alokai);

  return {
    apiClient,
    extensions,
    initConfig,
    configuration,
  };
}

export async function registerIntegrations(
  app: Express,
  integrations: Integrations,
  loggerManager: LoggerManager
): Promise<IntegrationsLoaded> {
  const loadedIntegrations: IntegrationsLoaded = {};
  for (const [tag, integration] of Object.entries(integrations)) {
    const alokai = buildAlokaiContainer(tag, loggerManager);
    const logger = getLogger(alokai);

    logger.debug(`- Loading: ${tag} ${integration.location}`);

    const { apiClient, extensions, initConfig, configuration } =
      await loadIntegration(tag, integration, app, alokai);

    loadedIntegrations[tag] = {
      apiClient,
      extensions,
      initConfig,
      configuration,
      customQueries: integration.customQueries,
      errorHandler: integration.errorHandler ?? defaultErrorHandler,
    };
    logger.debug(`- Integration: ${tag} loaded!`);
  }

  return loadedIntegrations;
}
