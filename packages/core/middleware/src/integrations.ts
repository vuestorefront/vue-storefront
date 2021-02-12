import consola from 'consola';
import {
  Integration,
  ApiClientFactory,
  ApiClientExtension,
  IntegrationsSection
} from '@vue-storefront/core';

export interface IntegrationLoaded {
  apiClient: ApiClientFactory;
  configuration: any;
  extensions: ApiClientExtension[];
}

type IntegrationsLoaded = Record<string, IntegrationLoaded>

const createRawExtensions = (apiClient: ApiClientFactory, integration: Integration): ApiClientExtension[] => {
  const extensionsCreateFn = integration.extensions;
  const predefinedExtensions = (apiClient.createApiClient as any)._predefinedExtensions;
  return extensionsCreateFn ? extensionsCreateFn(predefinedExtensions) : predefinedExtensions;
};

const lookUpExternal = (curr: string | ApiClientExtension): ApiClientExtension[] =>
  typeof curr === 'string' ? require(curr) : [curr];

const createExtensions = (rawExtensions: ApiClientExtension[]): ApiClientExtension[] => rawExtensions
  .reduce((prev, curr) => [...prev, ...lookUpExternal(curr)], []);

const registerIntegrations = (integrations: IntegrationsSection): IntegrationsLoaded =>
  Object.entries<Integration>(integrations).reduce((prev, [tag, integration]) => {
    consola.info(`- Loading: ${tag} ${integration.location}`);

    const apiClient: ApiClientFactory = require(integration.location);
    const rawExtensions: ApiClientExtension[] = createRawExtensions(apiClient, integration);
    const extensions: ApiClientExtension[] = createExtensions(rawExtensions);

    extensions.forEach(({ name }) => {
      consola.info(`- Loading: ${tag} extension: ${name}`);
    });

    consola.success(`- Integration: ${tag} loaded!`);

    return {
      ...prev,
      [tag]: {
        apiClient,
        configuration: integration.configuration,
        extensions
      }
    };
  }, {});

export { registerIntegrations };
