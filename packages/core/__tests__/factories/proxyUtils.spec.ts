
import * as utils from '../../src/utils/nuxt/_proxyUtils';
import isHttps from 'is-https';

jest.mock('is-https');

describe('[CORE - factories] apiFactory/_proxyUtils', () => {
  it('returns base url based on incomming headers', () => {
    expect(utils.getBaseUrl(null)).toEqual('/api/')

    ;(isHttps as jest.Mock).mockReturnValue(true);
    expect(utils.getBaseUrl({ headers: { host: 'some-domain' } } as any)).toEqual('https://some-domain/api/')

    ;(isHttps as jest.Mock).mockReturnValue(false);
    expect(utils.getBaseUrl({ headers: { host: 'some-domain' } } as any)).toEqual('http://some-domain/api/')

    ;(isHttps as jest.Mock).mockReturnValue(true);
    expect(utils.getBaseUrl({ headers: { host: 'some-domain', 'x-forwarded-host': 'forwarded-host' } } as any)).toEqual('https://forwarded-host/api/')

    ;(isHttps as jest.Mock).mockReturnValue(false);
    expect(utils.getBaseUrl({ headers: { host: 'some-domain', 'x-forwarded-host': 'forwarded-host' } } as any)).toEqual('http://forwarded-host/api/');
  });

  it('returns proxy for defined api', () => {
    const givenApi = {
      getProduct: jest.fn()
    };

    const client = {
      post: jest.fn(() => ({ then: jest.fn() }))
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
    jest.spyOn(utils, 'getCookies').mockReturnValue('');
    jest.spyOn(utils, 'getBaseUrl').mockReturnValue('some-url');

    expect(utils.getIntegrationConfig(
      null,
      { someGivenOption: 1 }
    )).toEqual({
      axios: {
        baseURL: 'some-url',
        headers: {}
      },
      someGivenOption: 1
    });
  });

  it('it cobines config with the current one and adds a cookie', () => {
    jest.spyOn(utils, 'getCookies').mockReturnValue('xxx');
    jest.spyOn(utils, 'getBaseUrl').mockReturnValue('some-url');

    expect(utils.getIntegrationConfig(
      null,
      {}
    )).toEqual({
      axios: {
        baseURL: 'some-url',
        headers: {
          cookie: 'xxx'
        }
      }
    });
  });
});
