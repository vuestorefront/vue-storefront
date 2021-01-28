import { createExtendIntegrationInCtx, createAddIntegrationToCtx } from './context';
import { getIntegrationConfig, createProxiedApi } from './_proxyUtils';
import axios from 'axios';

export type IntegrationPlugin = (pluginFn) => (nuxtCtx, inject) => void

export const integrationPlugin = (pluginFn) => (nuxtCtx, inject) => {
  const configure = (tag, configuration) => {
    const injectInContext = createAddIntegrationToCtx({ tag, nuxtCtx, inject });
    const config = getIntegrationConfig(nuxtCtx, configuration);
    const client = axios.create(config.axios);
    const api = createProxiedApi({ givenApi: configuration.api, client, tag });

    injectInContext({ api, client, config });
  };

  const extend = (tag, integrationProperties) => {
    createExtendIntegrationInCtx({ tag, nuxtCtx, inject })(integrationProperties);
  };

  const integration = { configure, extend };

  pluginFn({ ...nuxtCtx, integration }, inject);
};
