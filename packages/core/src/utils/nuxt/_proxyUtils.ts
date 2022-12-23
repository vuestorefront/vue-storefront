import { Context as NuxtContext } from '@nuxt/types';
import merge from 'lodash-es/merge';
import { ApiClientMethod } from '../../types';
import { Logger } from '../logger';

interface CreateProxiedApiParams {
  givenApi: Record<string, ApiClientMethod>;
  client: any;
  tag: string;
}

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

  if (process.server && context?.$config?.middlewareUrl) {
    Logger.info('Applied middlewareUrl as ', context.$config.middlewareUrl);
  }

  const { middlewareUrl, ssrMiddlewareUrl } = context.$config;

  if (!middlewareUrl) {
    throw new Error('`middlewareUrl` is required. Provide the `middlewareUrl` in your integration\'s configuration.');
  }

  let baseURL: string = process.server ? ssrMiddlewareUrl || middlewareUrl : middlewareUrl;
  if (!baseURL.match(/https?:\/\//) && baseURL.charAt(0) !== '/') {
    baseURL = `/${baseURL}`;
  }

  const headers = {};
  cookie && Object.assign(headers, { cookie });
  const reqHeaders = context.req?.headers;
  reqHeaders?.['x-forwarded-host'] && Object.assign(headers, { 'X-Forwarded-Host': reqHeaders['x-forwarded-host'] });
  reqHeaders?.host && Object.assign(headers, { Host: reqHeaders.host });

  return merge({
    axios: {
      baseURL,
      headers
    }
  }, configuration);
};

