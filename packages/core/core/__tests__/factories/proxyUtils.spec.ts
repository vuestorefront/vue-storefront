
import * as utils from './../../src/utils/nuxt/_proxyUtils';
import isHttps from 'is-https';
import { vi } from 'vitest';

function isObject(item) {
  return (item && typeof item === 'object' && !Array.isArray(item));
}

function mergeDeep(target, source) {
  const output = Object.assign({}, target);
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!(key in target))
          Object.assign(output, { [key]: source[key] });
        else
          output[key] = mergeDeep(target[key], source[key]);
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  return output;
}

vi.mock('is-https');
vi.mock('lodash-es/merge', () => ({
  default: mergeDeep
}));

describe('[CORE - factories] apiFactory/_proxyUtils', () => {
  it('returns base url based on incomming headers', () => {
    expect(utils.getBaseUrl(null)).toEqual('/api/');

    (isHttps as vi.Mock).mockReturnValue(true);
    expect(utils.getBaseUrl({ headers: { host: 'some-domain' } } as any)).toEqual('https://some-domain/api/');

    (isHttps as vi.Mock).mockReturnValue(false);
    expect(utils.getBaseUrl({ headers: { host: 'some-domain' } } as any)).toEqual('http://some-domain/api/');

    (isHttps as vi.Mock).mockReturnValue(true);
    expect(utils.getBaseUrl({ headers: { host: 'some-domain', 'x-forwarded-host': 'forwarded-host' } } as any)).toEqual('https://forwarded-host/api/');

    (isHttps as vi.Mock).mockReturnValue(false);
    expect(utils.getBaseUrl({ headers: { host: 'some-domain', 'x-forwarded-host': 'forwarded-host' } } as any)).toEqual('http://forwarded-host/api/');
  });

  it('returns proxy for defined api', () => {
    const givenApi = {
      getProduct: vi.fn()
    };

    const client = {
      post: vi.fn(() => Promise.resolve({ data: {} }))
    };

    const proxiedApi = utils.createProxiedApi({ givenApi, client, tag: 'ct' });

    proxiedApi.getProduct({ product: 1 });
    proxiedApi.getCategory({ category: 1 });

    expect(givenApi.getProduct).toBeCalled();
    expect(client.post).toBeCalledWith('/ct/getCategory', [{ category: 1 }]);
  });

  it('reads cookies from incomming request', () => {
    expect(utils.getCookies(null)).toEqual('');
    expect(utils.getCookies({} as any)).toEqual('');
    expect(utils.getCookies({ req: { headers: {} } } as any)).toEqual('');
    expect(utils.getCookies({ req: { headers: { cookie: { someCookie: 1 } } } } as any)).toEqual({ someCookie: 1 });
  });

  it('it cobines config with the current one', () => {

    expect(utils.getIntegrationConfig(
      null,
      { someGivenOption: 1 }
    )).toEqual({
      axios: {
        baseURL: '/api/',
        headers: {}
      },
      someGivenOption: 1
    });
  });

  it('it cobines config with the current one and adds a cookie', () => {
    expect(utils.getIntegrationConfig(
      null,
      {}
    )).toEqual({
      axios: {
        baseURL: '/api/',
        headers: {}
      }
    });
  });
});
