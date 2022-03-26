import { Context as NuxtContext } from '@nuxt/types';
import merge from 'lodash-es/merge';
import { ApiClientMethod } from './../../types';
import { AxiosInstance } from 'axios';

interface CreateProxiedApiParams {
  givenApi: Record<string, ApiClientMethod>;
  client: any;
  tag: string;
}

const getUrl = (nxtContent: NuxtContext, endpoint: string) => {
  const { base, req } = nxtContent;
  const isServer = process.server;
  const isClient = process.client;

  if (!req) {
    return isClient && !isServer
      ? `${window.location.origin}/${endpoint}`
      : endpoint;
  }

  const { headers } = req;
  const isHttps = require('is-https')(req);
  const scheme = isHttps ? 'https' : 'http';
  const host = headers['x-forwarded-host'] || headers.host;

  return `${scheme}://${host}${base}${endpoint}`;
};

export const addRequestInterceptor = (client: AxiosInstance, nxtContext: NuxtContext) => {
  client.interceptors.request.use((config) => {
    const apiEndpoint = `api${config.url}`;
    const hasApiPath = /\/api\//gi.test(config.url);

    config.url = hasApiPath ? config.url : getUrl(nxtContext, apiEndpoint);
    return config;
  });

  return client;
};

export const createProxiedApi = ({ givenApi, client, tag }: CreateProxiedApiParams) => new Proxy(givenApi, {
  get: (target, prop, receiver) => {

    const functionName = String(prop);
    if (Reflect.has(target, functionName)) {
      return Reflect.get(target, prop, receiver);
    }

    return async (...args) => client
      .post(`/${tag}/${functionName}`, args)
      .then(r => r.data);
  }
});

export const getCookies = (context: NuxtContext) => context?.req?.headers?.cookie ?? '';

export const getIntegrationConfig = (context: NuxtContext, configuration: any) => {
  const cookie = getCookies(context);
  return merge({
    axios: {
      baseURL: context?.$config?.middlewareUrl || '',
      headers: {
        ...(cookie ? { cookie } : {})
      }
    }
  }, configuration);
};

