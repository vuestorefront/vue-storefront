import { nuxtContextFactory } from './nuxtContextFactory';
import { getIntegrationConfig, createProxiedApi } from './_proxyUtils';
import axios from 'axios';

export type IntegrationPlugin = (pluginFn) => (nuxtCtx, inject) => void

export const integrationPluginFactory = (createApiClient): IntegrationPlugin => (pluginFn) => (nuxtCtx, inject) => {
  const { extendContext, injectInContext } = nuxtContextFactory({ tag: createApiClient.tag, nuxtCtx, inject });

  const configure = (givenSettings, customApi = {}) => {
    const createApiClientFn = createApiClient.bind(nuxtCtx);
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

export const integrationPlugin = (pluginFn) => (nuxtCtx, inject) => {
  const tag = 'ct';
  const { extendContext, injectInContext } = nuxtContextFactory({ tag, nuxtCtx, inject });

  const configure = (configuration) => {
    const platformConfig = configuration;
    const _config = getIntegrationConfig({ context: nuxtCtx, platformConfig });
    const client = axios.create(_config.axios);
    const settings = { client, config: _config };
    const api = createProxiedApi({ givenApi: configuration.api, client, tag });

    const props = { api, client, config: settings };

    injectInContext(props);
  };

  const extend = (props) => {
    extendContext(props);
  };

  const integration = { configure, extend };

  pluginFn({ ...nuxtCtx, integration }, inject);
};
