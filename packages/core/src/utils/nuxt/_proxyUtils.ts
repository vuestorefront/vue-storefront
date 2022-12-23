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

  return merge({
    axios: {
      baseURL,
      headers: {
        ...(cookie ? { cookie } : {}),
        ...(context.req ? { Host: context.req.headers['x-forwarded-host'] || context.req.headers.host } : {})
      }
    }
  }, configuration);
};

