import * as types from '../../../store/mutation-types';
import compareActions from '../../../store/actions';
import { cacheStorage } from '@vue-storefront/core/modules/recently-viewed/index'

jest.mock('@vue-storefront/core/lib/logger', () => ({
  Logger: {
    info: jest.fn(() => jest.fn())
  }
}))
jest.mock('@vue-storefront/core/modules/recently-viewed/index', () => ({
  cacheStorage: {
    getItem: jest.fn()
  }
}));
jest.mock('@vue-storefront/core/lib/storage-manager', () => ({
  StorageManager: {
    get: jest.fn(() => cacheStorage)
  }
}))

let product

describe('Compare actions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    product = { id: 'xyz' };
  });

  describe('load', () => {
    it('should NOT load state if is already loaded', () => {
      const contextMock = {
        commit: jest.fn(),
        dispatch: jest.fn(),
        getters: { isCompareLoaded: true }
      };
      const wrapper = (actions: any) => actions.load(contextMock);

      wrapper(compareActions);

      expect(contextMock.commit).not.toBeCalledWith(types.SET_COMPARE_LOADED);
    });

    it('should load state if forced', () => {
      const contextMock = {
        commit: jest.fn(),
        dispatch: jest.fn(),
        getters: { isCompareLoaded: true }
      };
      const wrapper = (actions: any) => actions.load(contextMock, true);

      wrapper(compareActions);

      expect(contextMock.commit).toBeCalledWith(types.SET_COMPARE_LOADED);
    });

    it('should try to load state', () => {
      const contextMock = {
        commit: jest.fn(),
        dispatch: jest.fn(),
        getters: { isCompareLoaded: false }
      };
      const wrapper = (actions: any) => actions.load(contextMock);

      wrapper(compareActions);

      expect(contextMock.commit).toBeCalledWith(types.SET_COMPARE_LOADED);
      expect(contextMock.dispatch).toBeCalledWith('fetchCurrentCompare');
    });

    it('should NOT commit state if there are no items', async () => {
      const contextMock = {
        commit: jest.fn(),
        dispatch: jest.fn(() => null),
        getters: { isCompareLoaded: false }
      };
      const wrapper = (actions: any) => actions.load(contextMock);

      await wrapper(compareActions);

      expect(contextMock.commit).not.toBeCalledWith(types.COMPARE_LOAD_COMPARE, null);
    });

    it('should commit state if are any items', async () => {
      const contextMock = {
        commit: jest.fn(),
        dispatch: jest.fn(() => [product]),
        getters: { isCompareLoaded: false }
      };
      const wrapper = (actions: any) => actions.load(contextMock);

      await wrapper(compareActions);

      expect(contextMock.commit).toBeCalledWith(types.COMPARE_LOAD_COMPARE, [product]);
    });
  });

  describe('fetchCurrentCompare', () => {
    it('should fetch items from cache', async () => {
      const wrapper = (actions: any) => actions.fetchCurrentCompare();

      await wrapper(compareActions);

      expect(cacheStorage.getItem).toBeCalledWith('current-compare');
    });
  });

  describe('addItem', () => {
    it('should call add product commit', async () => {
      const contextMock = {
        commit: jest.fn()
      };
      const wrapper = (actions: any) => actions.addItem(contextMock, product);

      await wrapper(compareActions);

      expect(contextMock.commit).toBeCalledWith(types.COMPARE_ADD_ITEM, { product });
    });
  });

  describe('removeItem', () => {
    it('should call remove product commit', async () => {
      const contextMock = {
        commit: jest.fn()
      };
      const wrapper = (actions: any) => actions.removeItem(contextMock, product);

      await wrapper(compareActions);

      expect(contextMock.commit).toBeCalledWith(types.COMPARE_DEL_ITEM, { product });
    });
  });

  describe('clear', () => {
    it('should call clear state commit', async () => {
      const contextMock = {
        commit: jest.fn()
      };
      const wrapper = (actions: any) => actions.clear(contextMock);

      await wrapper(compareActions);

      expect(contextMock.commit).toBeCalledWith(types.COMPARE_LOAD_COMPARE, []);
    });
  });
});
