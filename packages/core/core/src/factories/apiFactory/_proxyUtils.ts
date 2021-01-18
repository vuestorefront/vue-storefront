import merge from 'lodash-es/merge';

export const getBaseUrl = (req) => {
  if (!req) return '/api/';
  const { headers } = req;
  const isHttps = require('is-https')(req);
  const scheme = isHttps ? 'https' : 'http';
  const host = headers['x-forwarded-host'] || headers.host;

  return `${scheme}://${host}/api/`;
};

export const createProxiedApi = ({ givenApi, client, factoryParams }) => new Proxy(givenApi, {
  get: (target, prop, receiver) => {
    const functionName = String(prop);
    if (Reflect.has(target, functionName)) {
      return Reflect.get(target, prop, receiver);
    }

    return async (...args) => client
      .post(`/${factoryParams.tag}/${functionName}`, args)
      .then(r => r.data);
  }
});

export const getCookies = (context) => (context && context.req && context.req.headers.cookie) || '';

export const getIntegrationConfig = ({ context, factoryParams, givenConfig }) => {
  const cookie = getCookies(context);
  const initialConfig = merge({
    axios: {
      baseURL: getBaseUrl(context && context.req),
      headers: {
        ...(cookie ? { cookie } : {})
      }
    }
  }, givenConfig);

  if (factoryParams.onCreate) {
    return factoryParams.onCreate(initialConfig).config;
  }

  return initialConfig;
};
