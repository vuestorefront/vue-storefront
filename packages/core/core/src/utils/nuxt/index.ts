import { createExtendIntegrationInCtx, createAddIntegrationToCtx } from './context';
import { getIntegrationConfig, createProxiedApi } from './_proxyUtils';
import { Context as NuxtContext, Plugin as NuxtPlugin } from '@nuxt/types';
import axios from 'axios';
import http from 'http';
import https from 'https';

type InjectFn = (key: string, value: any) => void;
export type IntegrationPlugin = (pluginFn: NuxtPlugin) => NuxtPlugin

const parseCookies = (cookieString: string): Record<string, string> =>
  cookieString
    .split(';')
    .filter(String)
    .map(item => item.split('=').map(part => part.trim()))
    .reduce((obj, [name, value]) => ({ ...obj, [name]: value }), {});

const setCookieValues = (cookieValues: Record<string, string>, cookieString = '') => {
  const parsed = parseCookies(cookieString);

  Object.entries(cookieValues).forEach(([name, value]) => parsed[name] = value);

  return Object.entries(parsed).map(([name, value]) => `${name}=${value}`).join('; ');
};

export const integrationPlugin = (pluginFn: NuxtPlugin) => (nuxtCtx: NuxtContext, inject: InjectFn) => {
  const configure = (tag, configuration) => {
    const injectInContext = createAddIntegrationToCtx({ tag, nuxtCtx, inject });
    const config = getIntegrationConfig(nuxtCtx, configuration);
    const { middlewareUrl, ssrMiddlewareUrl } = (nuxtCtx as any).$config;

    if (middlewareUrl) {
      config.axios.baseURL = process.server ? ssrMiddlewareUrl || middlewareUrl : middlewareUrl;
    }

    const keepAliveConfig = {
      keepAlive: process.env.AXIOS_KEEP_ALIVE_ENABLED === 'true',
      keepAliveMsecs: parseInt(process.env.AXIOS_KEEP_ALIVE_MSECS) || 1000,
      maxFreeSockets: parseInt(process.env.AXIOS_MAX_FREE_SOCKETS) || 256
    };

    const client = axios.create({
      ...config.axios,
      httpAgent: new http.Agent(keepAliveConfig),
      httpsAgent: new https.Agent(keepAliveConfig)
    });

    const api = createProxiedApi({ givenApi: configuration.api || {}, client, tag });

    if (nuxtCtx.app.i18n.cookieValues) {
      client.defaults.headers.cookie = setCookieValues(nuxtCtx.app.i18n.cookieValues, client.defaults.headers.cookie);
    }

    injectInContext({ api, client, config });
  };

  const extend = (tag, integrationProperties) => {
    createExtendIntegrationInCtx({ tag, nuxtCtx, inject })(integrationProperties);
  };

  const integration = { configure, extend };

  pluginFn({ ...nuxtCtx, integration } as NuxtContext, inject);
};
