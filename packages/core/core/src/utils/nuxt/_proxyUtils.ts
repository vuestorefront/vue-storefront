import { Context as NuxtContext } from '@nuxt/types';
import merge from 'lodash-es/merge';
import { ApiClientMethod } from './../../types';

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

  if (context?.$config?.middlewareUrl) {
    const { middlewareUrl } = context.$config;
    return merge({
      axios: {
        baseURL: middlewareUrl,
        headers: {
          ...(cookie ? { cookie } : {})
        }
      }
    }, configuration);
  }

  return merge({
    axios: {
      headers: {
        ...(cookie ? { cookie } : {})
      }
    }
  }, configuration);
};
