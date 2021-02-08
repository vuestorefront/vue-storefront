import { createExtendIntegrationInCtx, createAddIntegrationToCtx } from './context';
import { getIntegrationConfig, createProxiedApi } from './_proxyUtils';
import { Context as NuxtContext, Plugin as NuxtPlugin } from '@nuxt/types';
import axios from 'axios';

type InjectFn = (key: string, value: any) => void;
export type IntegrationPlugin = (pluginFn: NuxtPlugin) => NuxtPlugin

export const integrationPlugin = (pluginFn: NuxtPlugin) => (nuxtCtx: NuxtContext, inject: InjectFn) => {
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

  pluginFn({ ...nuxtCtx, integration } as NuxtContext, inject);
};
