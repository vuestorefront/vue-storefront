import { applyContextForApi } from './../context';

const createInjector = ({ tag, nuxtCtx, inject }) => {
  const extendContext = (props) => {
    const integrationKey = '$' + tag;
    if (!nuxtCtx.$vsf || !nuxtCtx.$vsf[integrationKey]) {
      inject('vsf', { [integrationKey]: {} });
    }

    const current = nuxtCtx.$vsf[integrationKey];
    const client = current.client;

    const config = {
      ...current.config,
      ...(props.config || {})
    };

    if (nuxtCtx.$vsf[integrationKey].api) {
      nuxtCtx.$vsf[integrationKey].api = {
        ...current.api,
        ...applyContextForApi((props.api || {}), { client, config })
      };
    }

    Object.keys(props)
      .filter(k => !['api', 'client', 'config'].includes(k))
      .forEach(key => {
        nuxtCtx.$vsf[integrationKey][key] = props[key];
      });
  };

  const injectInContext = (props) => {
    inject('vsf', { ['$' + tag]: props });
  };

  return {
    extendContext,
    injectInContext
  };
};

export const integrationPluginFactory = (createApiClientFn = null) => (pluginFn) => (nuxtCtx, inject) => {
  const { extendContext, injectInContext } = createInjector({ tag: createApiClientFn.tag, nuxtCtx, inject });

  const configure = (givenSettings, customApi = {}) => {
    if (!createApiClientFn) return;

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
