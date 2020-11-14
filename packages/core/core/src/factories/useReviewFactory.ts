import { Ref, computed } from '@vue/composition-api';
import { CustomQuery, UseReview, BaseFactoryParams } from '../types';
import { sharedRef, Logger } from '../utils';
import { createFactoryParams } from './../utils';

export interface UseReviewFactoryParams<REVIEW, REVIEWS_SEARCH_PARAMS, REVIEW_ADD_PARAMS, API> extends BaseFactoryParams<API> {
  searchReviews: (params: REVIEWS_SEARCH_PARAMS, customQuery?: CustomQuery) => Promise<REVIEW>;
  addReview: (params: REVIEW_ADD_PARAMS, customQuery?: CustomQuery) => Promise<REVIEW>;
}

export function useReviewFactory<REVIEW, REVIEWS_SEARCH_PARAMS, REVIEW_ADD_PARAMS, API>(
  rawFactoryParams: UseReviewFactoryParams<REVIEW, REVIEWS_SEARCH_PARAMS, REVIEW_ADD_PARAMS, API>
) {
  return function useReview(id: string): UseReview<REVIEW, REVIEWS_SEARCH_PARAMS, REVIEW_ADD_PARAMS> {
    const reviews: Ref<REVIEW> = sharedRef([], `useReviews-reviews-${id}`);
    const loading: Ref<boolean> = sharedRef(false, `useReviews-loading-${id}`);
    const error: Ref<string | null> = sharedRef(null, `useReviews-error-${id}`);
    const factoryParams = createFactoryParams(rawFactoryParams);

    const search = async (params?: REVIEWS_SEARCH_PARAMS, customQuery?: CustomQuery): Promise<void> => {
      Logger.debug('useReview.search', params);

      try {
        loading.value = true;
        reviews.value = await factoryParams.searchReviews(params, customQuery);
      } catch (searchError) {
        Logger.error('useReview.search', searchError);

        error.value = searchError.toString();
      } finally {
        loading.value = false;
      }
    };

    const addReview = async (params: REVIEW_ADD_PARAMS, customQuery?: CustomQuery): Promise<void> => {
      Logger.debug('useReview.addReview', params);

      try {
        loading.value = true;
        reviews.value = await factoryParams.addReview(params, customQuery);
      } catch (addError) {
        Logger.error('useReview.addReview', addError);

        error.value = addError.toString();
      } finally {
        loading.value = false;
      }
    };

    return {
      search,
      addReview,
      reviews: computed(() => reviews.value),
      loading: computed(() => loading.value),
      error: computed(() => error.value)
    };
  };
}
