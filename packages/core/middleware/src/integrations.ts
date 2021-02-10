import consola from 'consola';

const createRawExtensions = (apiClient, integrationConfig) => {
  const extensionsCreateFn = integrationConfig.extensions;
  const prederinedExtensions = apiClient.createApiClient._predefinedExtensions;
  return extensionsCreateFn ? extensionsCreateFn(prederinedExtensions) : prederinedExtensions;
};

const lookUpExternal = (curr) => typeof curr === 'string' ? require(curr) : [curr];

const createExtensions = (rawExtensions) => rawExtensions
  .reduce((prev, curr) => [...prev, ...lookUpExternal(curr)], []);

const registerIntegrations = (integrations) =>
  Object.entries(integrations).reduce((prev, [tag, integrationConfig]: any) => {
    consola.info(`- Loading: ${tag} ${integrationConfig.location}`);

    const apiClient = require(integrationConfig.location);
    const rawExtensions = createRawExtensions(apiClient, integrationConfig);
    const extensions = createExtensions(rawExtensions);

    extensions.forEach(({ name }) => {
      consola.info(`- Loading: ${tag} extension: ${name}`);
    });

    consola.success(`- Integration: ${tag} loaded!`);

    return {
      ...prev,
      [tag]: {
        apiClient,
        configuration: integrationConfig.configuration,
        extensions
      }
    };
  }, {});

export { registerIntegrations };
