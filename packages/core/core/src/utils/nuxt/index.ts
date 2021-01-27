import { createExtendContext, createInjectInContext } from './context';
import { getIntegrationConfig, createProxiedApi } from './_proxyUtils';
import axios from 'axios';

export type IntegrationPlugin = (pluginFn) => (nuxtCtx, inject) => void

export const integrationPlugin = (pluginFn) => (nuxtCtx, inject) => {
  const configure = (tag, configuration) => {
    const injectInContext = createInjectInContext({ tag, nuxtCtx, inject });
    const platformConfig = configuration;
    const _config = getIntegrationConfig({ context: nuxtCtx, platformConfig });
    const client = axios.create(_config.axios);
    const settings = { client, config: _config };
    const api = createProxiedApi({ givenApi: configuration.api, client, tag });

    const props = { api, client, config: settings };

    injectInContext(props);
  };

  const extend = (tag, props) => {
    const extendContext = createExtendContext({ tag, nuxtCtx, inject });
    extendContext(props);
  };

  const integration = { configure, extend };

  pluginFn({ ...nuxtCtx, integration }, inject);
};
