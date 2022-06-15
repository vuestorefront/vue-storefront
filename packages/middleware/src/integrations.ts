import consola from 'consola';
import { Express } from 'express';
import {
  Integration,
  ApiClientFactory,
  ApiClientExtension,
  IntegrationsSection,
  CustomQuery,
  Logger
} from '@vue-storefront/core';

interface IntegrationLoaded {
  apiClient: ApiClientFactory;
  configuration: any;
  extensions: ApiClientExtension[];
  customQueries?: Record<string, CustomQuery>
}

type IntegrationsLoaded = Record<string, IntegrationLoaded>

/**
 * Resolves dependencies based on the current working directory, not relative to this package.
 */
function resolveDependency<T>(name: string): T {
  try {
    const path = require.resolve(name, { paths: [process.cwd()] });

    // eslint-disable-next-line global-require
    return require(path);
  } catch (error) {
    Logger.error(error);
    throw new Error(`Could not resolve integration "${name}". See the error above for more details.`);
  }
}

function createRawExtensions(apiClient: ApiClientFactory, integration: Integration): ApiClientExtension[] {
  const extensionsCreateFn = integration.extensions;
  const predefinedExtensions = (apiClient.createApiClient as any)._predefinedExtensions;

  return extensionsCreateFn
    ? extensionsCreateFn(predefinedExtensions)
    : predefinedExtensions;
}

function lookUpExternal(extension: string | ApiClientExtension): ApiClientExtension[] {
  return typeof extension === 'string'
    ? resolveDependency<ApiClientExtension[]>(extension)
    : [extension];
}

function createExtensions(rawExtensions: ApiClientExtension[]): ApiClientExtension[] {
  return rawExtensions.reduce((prev, curr) => [
    ...prev,
    ...lookUpExternal(curr)
  ], []);
}

function registerIntegrations(app: Express, integrations: IntegrationsSection): IntegrationsLoaded {
  return Object.entries<Integration>(integrations).reduce((prev, [tag, integration]) => {
    consola.info(`- Loading: ${tag} ${integration.location}`);

    const apiClient: ApiClientFactory = resolveDependency<ApiClientFactory>(integration.location);
    const rawExtensions: ApiClientExtension[] = createRawExtensions(apiClient, integration);
    const extensions: ApiClientExtension[] = createExtensions(rawExtensions);

    extensions.forEach(({ name, extendApp }) => {
      consola.info(`- Loading: ${tag} extension: ${name}`);

      if (extendApp) {
        extendApp({ app, configuration: integration.configuration });
      }
    });

    consola.success(`- Integration: ${tag} loaded!`);

    return {
      ...prev,
      [tag]: {
        apiClient,
        extensions,
        configuration: integration.configuration,
        customQueries: integration.customQueries
      }
    };
  }, {});
}

export { registerIntegrations };
