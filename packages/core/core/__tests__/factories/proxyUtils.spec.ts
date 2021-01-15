
import * as utils from './../../src/factories/apiClientFactory/_proxyUtils';
import isHttps from 'is-https';

jest.mock('is-https');

describe('[CORE - factories] apiClientFactory/_proxyUtils', () => {
  it('returns base url based on incomming headers', () => {
    expect(utils.getBaseUrl(null)).toEqual('/api/')

    ;(isHttps as jest.Mock).mockReturnValue(true);
    expect(utils.getBaseUrl({ headers: { host: 'some-domain' } })).toEqual('https://some-domain/api/')

    ;(isHttps as jest.Mock).mockReturnValue(false);
    expect(utils.getBaseUrl({ headers: { host: 'some-domain' } })).toEqual('http://some-domain/api/')

    ;(isHttps as jest.Mock).mockReturnValue(true);
    expect(utils.getBaseUrl({ headers: { host: 'some-domain', 'x-forwarded-host': 'forwarded-host' } })).toEqual('https://forwarded-host/api/')

    ;(isHttps as jest.Mock).mockReturnValue(false);
    expect(utils.getBaseUrl({ headers: { host: 'some-domain', 'x-forwarded-host': 'forwarded-host' } })).toEqual('http://forwarded-host/api/');
  });

  it('returns proxy for defined api', () => {
    const givenApi = {
      getProduct: jest.fn()
    };

    const client = {
      post: jest.fn(() => ({ then: jest.fn() }))
    };
    const factoryParams = { tag: 'ct' };

    const proxiedApi = utils.createProxy({ givenApi, client, factoryParams });

    proxiedApi.getProduct({ product: 1 });
    proxiedApi.getCategory({ category: 1 });

    expect(givenApi.getProduct).toBeCalled();
    expect(client.post).toBeCalledWith('/ct/getCategory', [{ category: 1 }]);
  });

  it('reads cookies from incomming request', () => {
    expect(utils.getCookies(null)).toEqual('');
    expect(utils.getCookies({})).toEqual('');
    expect(utils.getCookies({ req: { headers: {} } })).toEqual('');
    expect(utils.getCookies({ req: { headers: { cookie: { someCookie: 1 } } } })).toEqual({ someCookie: 1 });
  });

  it('it cobines config with the current one', () => {
    jest.spyOn(utils, 'getCookies').mockReturnValue('');
    jest.spyOn(utils, 'getBaseUrl').mockReturnValue('some-url');

    expect(utils.getConfig({
      context: null,
      factoryParams: {},
      givenConfig: { someGivenOption: 1 }
    })).toEqual({
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

    expect(utils.getConfig({
      context: null,
      factoryParams: {},
      givenConfig: {}
    })).toEqual({
      axios: {
        baseURL: 'some-url',
        headers: {
          cookie: 'xxx'
        }
      }
    });
  });

  it('it cobines config with the current one and calls onSetup', () => {
    jest.spyOn(utils, 'getCookies').mockReturnValue(null);
    jest.spyOn(utils, 'getBaseUrl').mockReturnValue('some-url');

    const onSetup = jest.fn((config) => ({ config }));

    const result = utils.getConfig({
      context: null,
      factoryParams: { onSetup },
      givenConfig: {}
    });

    expect(result).toEqual({
      axios: {
        baseURL: 'some-url',
        headers: {}
      }
    });

    expect(onSetup).toBeCalledWith(result);
  });
});
