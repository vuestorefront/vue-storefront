import { nuxtContextFactory } from './nuxtContextFactory';

export type IntegrationPlugin = (pluginFn) => (nuxtCtx, inject) => void

export const integrationPluginFactory = (createApiClient): IntegrationPlugin => (pluginFn) => (nuxtCtx, inject) => {
  const { extendContext, injectInContext } = nuxtContextFactory({ tag: createApiClient.tag, nuxtCtx, inject });

  const configure = (givenSettings, customApi = {}) => {
    const createApiClientFn = createApiClient.bind(nuxtCtx);
    const { api, client, settings } = createApiClientFn(givenSettings, customApi);
    const props = { api, client, config: settings };

    injectInContext(props);
  };

  const extend = (props) => {
    extendContext(props);
  };

  const integration = { configure, extend };

  pluginFn({ ...nuxtCtx, integration }, inject);
};
