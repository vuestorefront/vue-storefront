import { nuxtContextFactory } from './nuxtContextFactory';

export const integrationPluginFactory = (createApiClient) => (pluginFn) => (nuxtCtx, inject) => {
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
