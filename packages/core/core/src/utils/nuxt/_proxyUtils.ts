import merge from 'lodash-es/merge';

export const getBaseUrl = (req) => {
  if (!req) return '/api/';
  const { headers } = req;
  const isHttps = require('is-https')(req);
  const scheme = isHttps ? 'https' : 'http';
  const host = headers['x-forwarded-host'] || headers.host;

  return `${scheme}://${host}/api/`;
};

export const createProxiedApi = ({ givenApi, client, tag }) => new Proxy(givenApi, {
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

export const getCookies = (context) => context?.req?.headers?.cookie ?? '';

export const getIntegrationConfig = ({ context, platformConfig }) => {
  const cookie = getCookies(context);
  const initialConfig = merge({
    axios: {
      baseURL: getBaseUrl(context?.req),
      headers: {
        ...(cookie ? { cookie } : {})
      }
    }
  }, platformConfig);

  return initialConfig;
};
