import { nuxtContextFactory } from './nuxtContentFactory';

export const integrationPluginFactory = (createApiClientFn) => (pluginFn) => (nuxtCtx, inject) => {
  const { extendContext, injectInContext } = nuxtContextFactory({ tag: createApiClientFn.tag, nuxtCtx, inject });

  const configure = (givenSettings, customApi = {}) => {
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
