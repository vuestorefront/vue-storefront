import * as types from '../../store/mutation-types';
import recentlyViewedActions from '../../store/actions';
import { cacheStorage } from '@vue-storefront/core/modules/recently-viewed/index'

jest.mock('@vue-storefront/core/modules/recently-viewed/index', () => ({
  cacheStorage: {
    getItem: jest.fn()
  }
}));

let product

describe('RecentlyViewed actions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    product = { id: 'xyz' };
  });

  describe('addItem', () => {
    it('should add recently viewed item', () => {
      const contextMock = {
        commit: jest.fn()
      };
      const wrapper = (actions: any) => actions.addItem(contextMock, product);

      wrapper(recentlyViewedActions);

      expect(contextMock.commit).toBeCalledWith(types.RECENTLY_VIEWED_ADD_ITEM, { product });
    });
  });

  describe('load', () => {
    it('should add storedItems from cache', () => {
      const contextMock = {
        commit: jest.fn()
      };
      const wrapper = (actions: any) => actions.load(contextMock);

      cacheStorage.getItem.mockImplementationOnce(
        jest.fn((cacheType, callback) => callback(null, [product]))
      )

      wrapper(recentlyViewedActions);

      expect(contextMock.commit).toBeCalledWith(types.RECENTLY_VIEWED_LOAD, [product]);
    });

    it('should throw error if there is a problem while loading storedItems', () => {
      const contextMock = {
        commit: jest.fn()
      };
      const wrapper = (actions: any) => actions.load(contextMock);

      cacheStorage.getItem.mockImplementationOnce(
        jest.fn((cacheType, callback) => callback(new Error('test'), [product]))
      );

      expect(wrapper.bind(null, recentlyViewedActions)).toThrowError('test');
    });
  });
})
