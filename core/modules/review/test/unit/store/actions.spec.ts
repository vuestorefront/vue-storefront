import * as types from '../../../store/mutation-types';
import reviewActions from '../../../store/actions';
import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'
import { createLoadReviewsQuery } from '@vue-storefront/core/modules/review/helpers'
import { quickSearchByQuery } from '@vue-storefront/core/lib/search'
import SearchQuery from '@vue-storefront/core/lib/search/searchQuery'

jest.mock('@vue-storefront/core/helpers', () => ({
  once: (str) => jest.fn()
}))
jest.mock('@vue-storefront/i18n', () => ({ t: jest.fn(str => str) }));
jest.mock('@vue-storefront/core/store', () => ({
  state: {
    items: []
  }
}))
jest.mock('@vue-storefront/core/lib/multistore', () => ({
  currentStoreView: jest.fn(() => ({
    storeCode: 'de'
  }))
}));
jest.mock('@vue-storefront/core/lib/search', () => ({
  quickSearchByQuery: jest.fn()
}));
jest.mock('@vue-storefront/core/modules/review/helpers', () => ({
  createLoadReviewsQuery: jest.fn()
}));
jest.mock('@vue-storefront/core/lib/search/searchQuery', () => ({
  SearchQuery: jest.fn()
}));

EventBus.$emit = jest.fn()

describe('Review actions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('list', () => {
    it('create load reviews query', async () => {
      const contextMock = {
        commit: jest.fn()
      };
      const payload = { productId: 1 }
      const wrapper = (actions: any) => actions.list(contextMock, payload);

      await wrapper(reviewActions);

      expect(createLoadReviewsQuery).toBeCalledWith({...payload, approved: true});
    });

    it('make quick search by query with default values', async () => {
      const contextMock = {
        commit: jest.fn()
      };
      const payload = { productId: 1 }
      const wrapper = (actions: any) => actions.list(contextMock, payload);

      (createLoadReviewsQuery as jest.Mock).mockImplementationOnce(() => SearchQuery);

      await wrapper(reviewActions);

      expect(quickSearchByQuery).toBeCalledWith({
        query: SearchQuery,
        start: 0,
        size: 50,
        entityType: 'review',
        sort: '',
        excludeFields: null,
        includeFields: null
      });
    });

    it('call review update commit', async () => {
      const contextMock = {
        commit: jest.fn()
      };
      const wrapper = (actions: any) => actions.list(contextMock, { productId: 1 });

      (quickSearchByQuery as jest.Mock).mockImplementationOnce(() => Promise.resolve(expect.anything()));

      await wrapper(reviewActions);

      expect(contextMock.commit).toBeCalledWith(types.REVIEW_UPD_REVIEWS, expect.anything());
    });
  });
})
