import * as types from '../../../store/mutation-types';
import reviewActions from '../../../store/actions';
import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'
import { createLoadReviewsQuery } from '@vue-storefront/core/modules/review/helpers'
import { quickSearchByQuery } from '@vue-storefront/core/lib/search'
import SearchQuery from '@vue-storefront/core/lib/search/searchQuery'
import { ReviewsService } from '@vue-storefront/core/data-resolver'

jest.mock('@vue-storefront/core/helpers', () => ({
  once: (str) => jest.fn(),
  processLocalizedURLAddress: jest.fn()
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
jest.mock('@vue-storefront/core/lib/sync', () => ({
  TaskQueue: {
    execute: jest.fn(() => Promise.resolve({ code: 200 }))
  }
}))
jest.mock('@vue-storefront/core/data-resolver', () => ({
  ReviewsService: {
    createReview: jest.fn(() => true)
  }
}))

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

      expect(createLoadReviewsQuery).toBeCalledWith({ ...payload, approved: true });
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

  describe('add', () => {
    it('notify about starting process of adding a review', () => {
      const contextMock = {
        commit: jest.fn()
      };
      const payload = expect.anything()
      const wrapper = (actions: any) => actions.add(contextMock, payload);

      wrapper(reviewActions);

      expect(EventBus.$emit).toBeCalledWith('notification-progress-start', expect.anything())
    });

    it('notify about finished process of adding a review', async () => {
      const contextMock = {
        commit: jest.fn()
      };
      const payload = expect.anything()
      const wrapper = (actions: any) => actions.add(contextMock, payload);

      await wrapper(reviewActions);

      expect(EventBus.$emit).toBeCalledWith('notification-progress-stop')
    });

    it('send event to clear review form after success', async () => {
      const contextMock = {
        commit: jest.fn()
      };
      const payload = expect.anything()
      const wrapper = (actions: any) => actions.add(contextMock, payload);

      await wrapper(reviewActions);

      expect(EventBus.$emit).toBeCalledTimes(3)
      expect(EventBus.$emit).toBeCalledWith('clear-add-review-form')
    });

    it('don\'t send event to clear review form after fail', async () => {
      const contextMock = {
        commit: jest.fn()
      };
      const payload = expect.anything()
      const wrapper = (actions: any) => actions.add(contextMock, payload);

      (ReviewsService.createReview as jest.Mock).mockImplementationOnce(jest.fn(() => false))

      await wrapper(reviewActions);

      expect(EventBus.$emit).toBeCalledTimes(2)
    });
  })
})
