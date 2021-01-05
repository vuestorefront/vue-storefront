import { nuxtContextFactory } from './nuxtContextFactory';

const getBaseUrl = (nuxtCtx) => {
  if (!nuxtCtx.req) return '';
  const isHttps = require('is-https')(nuxtCtx.req);
  const scheme = isHttps ? 'https' : 'http';

  return `${scheme}://${nuxtCtx.req.headers.host}`;
};

export const integrationPluginFactory = (createApiClientFn) => (pluginFn) => (nuxtCtx, inject) => {
  const { extendContext, injectInContext } = nuxtContextFactory({ tag: createApiClientFn.tag, nuxtCtx, inject });

  const configure = (givenSettings, customApi = {}) => {
    const headers = nuxtCtx.req ? nuxtCtx.req.headers : {};
    const axios = { baseURL: getBaseUrl(nuxtCtx) };
    const { api, client, settings } = createApiClientFn(
      { ...givenSettings, axios },
      customApi,
      headers
    );
    const props = { api, client, config: settings };

    injectInContext(props);
  };

  const extend = (props) => {
    extendContext(props);
  };

  const integration = { configure, extend };

  pluginFn({ ...nuxtCtx, integration }, inject);
};
