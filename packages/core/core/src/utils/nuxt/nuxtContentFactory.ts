import { applyContextForApi } from './../context';

export const nuxtContextFactory = ({ tag, nuxtCtx, inject }) => {
  const integrationKey = '$' + tag;

  const extendContext = (props) => {
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
