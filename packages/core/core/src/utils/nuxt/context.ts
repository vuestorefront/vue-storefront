import { applyContextToApi } from './../context';

/**
 * It extends given integartion, defined by `tag` in the context.
 */
export const createExtendIntegrationInCtx = ({ tag, nuxtCtx, inject }) => (integrationProperties) => {
  const integrationKey = '$' + tag;

  if (!nuxtCtx.$vsf || !nuxtCtx.$vsf[integrationKey]) {
    inject('vsf', { [integrationKey]: {} });
  }

  if (nuxtCtx.$vsf[integrationKey].api) {
    const integrationCtx = nuxtCtx.$vsf[integrationKey];
    const client = integrationCtx.client;

    const config = {
      ...integrationCtx.config,
      ...(integrationProperties.config || {})
    };
    nuxtCtx.$vsf[integrationKey].api = {
      ...integrationCtx.api,
      ...applyContextToApi((integrationProperties.api || {}), { client, config })
    };
  }

  Object.keys(integrationProperties)
    .filter(k => !['api', 'client', 'config'].includes(k))
    .forEach(key => {
      nuxtCtx.$vsf[integrationKey][key] = integrationProperties[key];
    });
};

/**
 * It creates a function that adds an integration to the context under the given name, defined by `tag`.
 */
export const createAddIntegrationToCtx = ({ tag, nuxtCtx, inject }) => (integrationProperties) => {
  const integrationKey = '$' + tag;

  if (nuxtCtx.$vsf && !nuxtCtx.$vsf[integrationKey]) {
    nuxtCtx.$vsf[integrationKey] = integrationProperties;
    return;
  }

  inject('vsf', { [integrationKey]: integrationProperties });
};
