import { nuxtContextFactory } from './nuxtContextFactory';

export const integrationPluginFactory = (createApiClientFn) => (pluginFn) => (nuxtCtx, inject) => {
  const { extendContext, injectInContext } = nuxtContextFactory({ tag: createApiClientFn.tag, nuxtCtx, inject });

  const configure = (givenSettings, customApi = {}) => {
    const headers = nuxtCtx.req ? nuxtCtx.req.headers : {};
    const { api, client, settings } = createApiClientFn(givenSettings, customApi, headers);
    const props = { api, client, config: settings };

    injectInContext(props);
  };

  const extend = (props) => {
    extendContext(props);
  };

  const integration = { configure, extend };

  pluginFn({ ...nuxtCtx, integration }, inject);
};
