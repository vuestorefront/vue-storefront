import { applyContextToApi } from './../context';

export const nuxtContextFactory = ({ tag, nuxtCtx, inject }) => {
  const integrationKey = '$' + tag;

  const extendContext = (props) => {
    if (!nuxtCtx.$vsf || !nuxtCtx.$vsf[integrationKey]) {
      inject('vsf', { [integrationKey]: {} });
    }

    if (nuxtCtx.$vsf[integrationKey].api) {
      const current = nuxtCtx.$vsf[integrationKey];
      const client = current.client;

      const config = {
        ...current.config,
        ...(props.config || {})
      };
      nuxtCtx.$vsf[integrationKey].api = {
        ...current.api,
        ...applyContextToApi((props.api || {}), { client, config })
      };
    }

    Object.keys(props)
      .filter(k => !['api', 'client', 'config'].includes(k))
      .forEach(key => {
        nuxtCtx.$vsf[integrationKey][key] = props[key];
      });
  };

  const injectInContext = (props) => {
    if (nuxtCtx.$vsf && !nuxtCtx.$vsf[integrationKey]) {
      nuxtCtx.$vsf[integrationKey] = props;
      return;
    }

    inject('vsf', { [integrationKey]: props });
  };

  return {
    extendContext,
    injectInContext
  };
};
