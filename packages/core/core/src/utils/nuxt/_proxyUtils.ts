import { Context as NuxtContext } from '@nuxt/types';
import merge from 'lodash-es/merge';
import { ApiClientMethod } from './../../types';

interface CreateProxiedApiParams {
  givenApi: Record<string, ApiClientMethod>;
  client: any;
  tag: string;
}

const getUrl = (context: NuxtContext, endpoint = '') => {
  return /\/api\//gi.test(endpoint) ? endpoint : `api/${endpoint}`;
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
      baseURL: getUrl(context, (process.server
        ? (context?.$config?.ssrMiddlewareUrl || context?.$config?.middlewareUrl)
        : context?.$config?.middlewareUrl)
      ),
      headers: {
        ...(cookie ? { cookie } : {})
      }
    }
  }, configuration);
};

