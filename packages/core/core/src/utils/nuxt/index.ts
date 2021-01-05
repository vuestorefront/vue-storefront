import { nuxtContextFactory } from './nuxtContextFactory';

const getBaseUrl = (nuxtCtx) => {
  if (!nuxtCtx.req) return '';
  const { headers } = nuxtCtx.req;
  const isHttps = require('is-https')(nuxtCtx.req);
  const scheme = isHttps ? 'https' : 'http';
  const host = headers['x-forwarded-host'] || headers.host;

  return `${scheme}://${host}`;
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
