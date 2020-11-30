import { composeApiWithContext } from './../context';

const createInjector = ({ nuxtCtx, inject }) => {
  const extendContext = (tag, props) => {
    const integrationKey = '$' + tag;
    if (!nuxtCtx.$vsf || !nuxtCtx.$vsf[integrationKey]) {
      inject('vsf', { [integrationKey]: {} });
    }

    const current = nuxtCtx.$vsf[integrationKey];
    const client = {
      ...current.client,
      ...(props.client || {})
    };

    const config = {
      ...current.config,
      ...(props.config || {})
    };

    if (nuxtCtx.$vsf[integrationKey].api) {
      nuxtCtx.$vsf[integrationKey].api = {
        ...current.api,
        ...composeApiWithContext((props.api || {}), { client, config })
      };
    }

    if (nuxtCtx.$vsf[integrationKey].client) {
      nuxtCtx.$vsf[integrationKey].client = client;
    }

    if (nuxtCtx.$vsf[integrationKey].config) {
      nuxtCtx.$vsf[integrationKey].config = config;
    }

    Object.keys(props)
      .filter(k => !['api', 'client', 'config'].includes(k))
      .forEach(key => {
        nuxtCtx.$vsf[integrationKey][key] = props[key];
      });
  };

  const injectInContext = (tag, props) => {
    inject('vsf', { ['$' + tag]: props });
  };

  return {
    extendContext,
    injectInContext
  };
};

export const createIntegrationPlugin = (createApiClientFn = null) => (pluginFn) => (nuxtCtx, inject) => {
  const { extendContext, injectInContext } = createInjector({ nuxtCtx, inject });

  const $configure = (givenSettings, customApi = {}) => {
    if (!createApiClientFn) return;

    const { tag, api, client, settings } = createApiClientFn(givenSettings, customApi);
    const props = { api, client, config: settings };
    injectInContext(tag, props);
  };

  const $extend = (tag, props) => {
    extendContext(tag, props);
  };

  pluginFn({ ...nuxtCtx, $configure, $extend }, inject);
};
