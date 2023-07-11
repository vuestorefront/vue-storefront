import * as utils from '../../../src/utils/nuxt/_proxyUtils';

describe('[CORE - utils] _proxyUtils', () => {
  beforeEach(() => {
    process.server = true;
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

  it('reads cookies from incoming request', () => {
    expect(utils.getCookies(null)).toEqual('');
    expect(utils.getCookies({} as any)).toEqual('');
    expect(utils.getCookies({ req: { headers: {} } } as any)).toEqual('');
    expect(utils.getCookies({ req: { headers: { cookie: { someCookie: 1 } } } } as any)).toEqual({ someCookie: 1 });
  });

  it('combines config with the current one', () => {
    jest.spyOn(utils, 'getCookies').mockReturnValue('');

    const integrationConfig = utils.getIntegrationConfig(
      {
        $config: {
          middlewareUrl: 'http://localhost.com'
        }
      } as any,
      { someGivenOption: 1 }
    );

    expect(integrationConfig).toEqual({
      axios: {
        baseURL: 'http://localhost.com',
        headers: {}
      },
      someGivenOption: 1
    });
  });

  it('combines config with the current one and adds a cookie', () => {
    jest.spyOn(utils, 'getCookies').mockReturnValue('xxx');

    const integrationConfig = utils.getIntegrationConfig(
      {
        $config: {
          middlewareUrl: 'http://localhost.com'
        }
      } as any,
      {}
    );

    expect(integrationConfig).toEqual({
      axios: {
        baseURL: 'http://localhost.com',
        headers: {
          cookie: 'xxx'
        }
      }
    });
  });

  it('adds a X-Forwarded-Host header', () => {
    const integrationConfig = utils.getIntegrationConfig(
      {
        $config: {
          middlewareUrl: 'http://localhost.com'
        },
        req: {
          headers: {
            'x-forwarded-host': 'myforward.vsf'
          }
        }
      } as any,
      {}
    );

    expect(integrationConfig).toEqual({
      axios: {
        baseURL: expect.any(String),
        headers: expect.objectContaining({
          Host: 'myforward.vsf'
        })
      }
    });
  });

  it('adds a Host header', () => {
    const integrationConfig = utils.getIntegrationConfig(
      {
        $config: {
          middlewareUrl: 'http://localhost.com'
        },
        req: {
          headers: {
            host: 'mywebsite.local'
          }
        }
      } as any,
      {}
    );

    expect(integrationConfig).toEqual({
      axios: {
        baseURL: expect.any(String),
        headers: expect.objectContaining({
          Host: 'mywebsite.local'
        })
      }
    });
  });

  /**
   * baseURL configuration cases matrix
   */
  const urlSetupCases = [
    { server: true, middlewareUrl: 'client/api', ssrMiddlewareUrl: 'server/api', expected: '/server/api' },
    { server: false, middlewareUrl: 'client/api', ssrMiddlewareUrl: 'server/api', expected: '/client/api' },
    { server: true, middlewareUrl: '/client/api', ssrMiddlewareUrl: '', expected: '/client/api' },
    { server: false, middlewareUrl: 'https://client/api', ssrMiddlewareUrl: null, expected: 'https://client/api' },
    { server: true, middlewareUrl: 'https://client/api', ssrMiddlewareUrl: 'https://server/api', expected: 'https://server/api' }
  ];

  const testMsg = '[baseUrl must be configured properly for] server: $server, middlewareUrl: $middlewareUrl, ssrMiddlewareUrl: $ssrMiddlewareUrl, expected: $expected';
  it.each(urlSetupCases)(testMsg, ({ server, middlewareUrl, ssrMiddlewareUrl, expected }) => {
    process.server = server;

    const integrationConfig = utils.getIntegrationConfig(
      {
        $config: {
          middlewareUrl,
          ssrMiddlewareUrl
        }
      } as any,
      {}
    );

    expect(integrationConfig).toEqual({
      axios: {
        baseURL: expected,
        headers: {
          cookie: 'xxx'
        }
      }
    });
  });

  it('[getIntegrationConfig] throws the error if the middlewareURL is not provided', () => {
    expect(() => {
      utils.getIntegrationConfig({ $config: { middlewareUrl: undefined } } as any, {});
    }).toThrow('`middlewareUrl` is required. Provide the `middlewareUrl` in your integration\'s configuration.');
  });

  it('sets Host from Host header', () => {
    const integrationConfig = utils.getIntegrationConfig(
      {
        $config: {
          middlewareUrl: 'http://localhost.com'
        },
        req: {
          headers: {
            host: 'pod.local'
          }
        }
      } as any,
      {}
    );

    expect(integrationConfig).toEqual({
      axios: {
        baseURL: expect.any(String),
        headers: expect.objectContaining({
          Host: 'pod.local'
        })
      }
    });
  });

  it('sets Host proritizing X-Forwarded-Host header over Host header', () => {
    const integrationConfig = utils.getIntegrationConfig(
      {
        $config: {
          middlewareUrl: 'http://localhost.com'
        },
        req: {
          headers: {
            'x-forwarded-host': 'myforward.vsf',
            host: 'pod.local'
          }
        }
      } as any,
      {}
    );

    expect(integrationConfig).toEqual({
      axios: {
        baseURL: expect.any(String),
        headers: expect.objectContaining({
          Host: 'myforward.vsf'
        })
      }
    });
  });
});
