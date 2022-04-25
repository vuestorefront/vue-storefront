import * as utils from '../../../src/utils/nuxt/_proxyUtils';

describe('[CORE - utils] _proxyUtils', () => {
  process.server = true;

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

  it('reads cookies from incoming request', () => {
    expect(utils.getCookies(null)).toEqual('');
    expect(utils.getCookies({} as any)).toEqual('');
    expect(utils.getCookies({ req: { headers: {} } } as any)).toEqual('');
    expect(utils.getCookies({ req: { headers: { cookie: { someCookie: 1 } } } } as any)).toEqual({ someCookie: 1 });
  });

  it('it combines config with the current one', () => {
    jest.spyOn(utils, 'getCookies').mockReturnValue('');

    expect(utils.getIntegrationConfig(
      {
        $config: {
          middlewareUrl: 'http://localhost.com'
        }
      } as any,
      { someGivenOption: 1 }
    )).toEqual({
      axios: {
        baseURL: 'http://localhost.com/api',
        headers: {}
      },
      someGivenOption: 1
    });
  });

  it('it combines config with the current one and adds a cookie', () => {
    jest.spyOn(utils, 'getCookies').mockReturnValue('xxx');

    expect(utils.getIntegrationConfig(
      {
        $config: {
          middlewareUrl: 'http://localhost.com'
        }
      } as any,
      {}
    )).toEqual({
      axios: {
        baseURL: 'http://localhost.com/api',
        headers: {
          cookie: 'xxx'
        }
      }
    });
  });
});
