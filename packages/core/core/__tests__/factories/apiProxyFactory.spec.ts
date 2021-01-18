import axios from 'axios';
import apiProxyFactory from './../../src/factories/apiFactory/apiProxyFactory';
import { getConfig, createProxy } from './../../src/factories/apiFactory/_proxyUtils';
import { applyContextForApi } from './../../src/utils/context';

jest.mock('axios', () => ({
  create: jest.fn(() => 'api-client connection')
}));

jest.mock('./../../src/factories/apiFactory/_utils', () => ({
  createInstance: jest.fn((arg1, factoryParams) => ({ ...arg1, factoryParams }))
}));

jest.mock('./../../src/factories/apiFactory/_proxyUtils', () => ({
  getConfig: jest.fn(() => ({ configOption: 1, axios: { host: 'some-host' } })),
  createProxy: jest.fn(() => ({ getProduct: 'get-product-fn' }))
}));

jest.mock('./../../src/utils/context', () => ({
  applyContextForApi: jest.fn(() => ({ getCategory: 'get-category-fn' }))
}));

describe('[CORE - factories] apiProxyFactory', () => {
  it('creates proxy api-client', () => {
    const factoryParams = {
      api: {
        getCart: jest.fn()
      }
    } as any;

    const context = { context: 1 };
    const givenConfig = { givenOption: 2 };
    const result = apiProxyFactory(factoryParams);
    result.createApiProxy.bind(context)(givenConfig);

    expect(getConfig).toBeCalledWith({ context, factoryParams, givenConfig });
    expect(axios.create).toBeCalledWith({ host: 'some-host' });
    expect(applyContextForApi).toBeCalledWith(
      { ...factoryParams.api },
      {
        client: 'api-client connection',
        config: { configOption: 1, axios: { host: 'some-host' } },
        isProxy: true
      }
    );
    expect(createProxy).toBeCalledWith({
      client: 'api-client connection',
      givenApi: { getCategory: 'get-category-fn' },
      factoryParams
    });
  });
});
