import { apiClientFactory } from '@vue-storefront/core';
import { BapiClient } from '@aboutyou/backbone';
import { setup, getCart } from '../src/index';

jest.mock('@aboutyou/backbone', () => ({
  BapiClient: jest.fn()
}));

const BapiClientMock = {
  basket: {
    get: jest.fn(),
    addItem: jest.fn(),
    deleteItem: jest.fn(),
    updateItem: jest.fn(),
    addOrUpdateItems: jest.fn()
  },
  categories: {
    getById: jest.fn(),
    getByIds: jest.fn(),
    getByPath: jest.fn(),
    getRoots: jest.fn()
  },
  filters: {
    get: jest.fn(),
    getValues: jest.fn()
  },
  products: {
    getById: jest.fn(),
    getByIds: jest.fn(),
    query: jest.fn()
  },
  search: {
    suggestions: jest.fn(),
    mapping: jest.fn()
  },
  variants: {
    getByIds: jest.fn()
  },
  wishlist: {
    get: jest.fn(),
    addItem: jest.fn(),
    deleteItem: jest.fn()
  }
};
const defaultSettings = {
  api: {
    host: 'Test',
    auth: {
      username: 'John',
      password: 'Galt'
    },
    shopId: 1957
  }
};
describe('[about-you-api] index', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (BapiClient as any).mockImplementation(() => BapiClientMock);
  });
  describe('onSetup', () => {
    it('has been called after passing to apiClientFactory', async () => {
      const defaultSettings = null as any;
      const onSetup = jest.fn();

      const apiFactory = apiClientFactory({ defaultSettings, onSetup });
      apiFactory.setup({});

      expect(onSetup).toHaveBeenCalled();
    });
    describe('returns apiClient with methods', () => {
      it('getCart', () => {
        expect(setup(defaultSettings));
        getCart('key');
        expect(BapiClientMock.basket.get).toHaveBeenCalled();
      });
    });
  });

  describe('', () => {

  });
});
