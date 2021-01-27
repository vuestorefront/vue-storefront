import { applyContextToApi } from './../context';

export const createExtendContext = ({ tag, nuxtCtx, inject }) => (props) => {
  const integrationKey = '$' + tag;

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

export const createInjectInContext = ({ tag, nuxtCtx, inject }) => (props) => {
  const integrationKey = '$' + tag;

  if (nuxtCtx.$vsf && !nuxtCtx.$vsf[integrationKey]) {
    nuxtCtx.$vsf[integrationKey] = props;
    return;
  }

  inject('vsf', { [integrationKey]: props });
};
