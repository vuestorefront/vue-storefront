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
  initConfig: Record<string, any>;
  configuration: any;
  extensions: ApiClientExtension[];
  customQueries?: Record<string, CustomQuery>;
}

interface LoadInitConfigProps {
  apiClient: ApiClientFactory;
  integration: Integration;
  tag: string;
}

type IntegrationsLoaded = Record<string, IntegrationLoaded>;

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

  return extensionsCreateFn ? extensionsCreateFn(predefinedExtensions) : predefinedExtensions;
}

function lookUpExternal(extension: string | ApiClientExtension): ApiClientExtension[] {
  return typeof extension === 'string' ? resolveDependency<ApiClientExtension[]>(extension) : [extension];
}

function createExtensions(rawExtensions: ApiClientExtension[]): ApiClientExtension[] {
  return rawExtensions.reduce((prev, curr) => [...prev, ...lookUpExternal(curr)], []);
}

async function getInitConfig({ apiClient, tag, integration }: LoadInitConfigProps): Promise<Record<string, any>> {
  if (apiClient?.init) {
    try {
      consola.success(`- Integration: ${tag} init function Start!`);
      const initConfig = await apiClient?.init(integration.configuration);
      consola.success(`- Integration: ${tag} init function Done!`);
      return initConfig;
    } catch (error) {
      throw Error(`Error during executing init function in ${tag} integration. Error message: ${error}`);
    }
  }
  return {};
}

async function registerIntegrations(app: Express, integrations: IntegrationsSection): Promise<IntegrationsLoaded> {
  return await Object.entries<Integration>(integrations).reduce(async (prevAsync, [tag, integration]) => {
    consola.info(`- Loading: ${tag} ${integration.location}`);
    const prev = await prevAsync;
    const apiClient: ApiClientFactory = resolveDependency<ApiClientFactory>(integration.location);
    const rawExtensions: ApiClientExtension[] = createRawExtensions(apiClient, integration);
    const extensions: ApiClientExtension[] = createExtensions(rawExtensions);
    const initConfig: Record<string, any> = await getInitConfig({ apiClient, integration, tag });

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
        initConfig,
        configuration: integration.configuration,
        customQueries: integration.customQueries
      }
    };
  }, Promise.resolve({}));
}

export { registerIntegrations };
