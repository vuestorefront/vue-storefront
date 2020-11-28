export const injectInContext = (inject, { tag, props }) => {
  const key = 'vsf' + tag.toUpperCase();
  inject(key, props);
};

export const createIntegrationPlugin = (createApiClientFn) => (pluginFn) => (nuxtCtx, inject) => {
  const $configure = (givenSettings, customApi = {}) => {
    const { tag, api, client, settings } = createApiClientFn(givenSettings, customApi);
    const props = { api, client, config: settings };
    injectInContext(inject, { tag, props });
  };

  const $addCustomOptions = (props) => {
    injectInContext(inject, { tag: 'custom', props });
  };

  pluginFn({ ...nuxtCtx, $configure, $addCustomOptions }, inject);
};
