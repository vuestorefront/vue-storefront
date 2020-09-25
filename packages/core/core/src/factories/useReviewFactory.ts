import { Ref, computed } from '@vue/composition-api';
import { UseReview } from '../types';
import { sharedRef } from '../utils';

export declare type UseReviewFactoryParams<REVIEW, REVIEWS_SEARCH_PARAMS, REVIEW_ADD_PARAMS, CUSTOM_QUERY = any> = {
  searchReviews: (params: REVIEWS_SEARCH_PARAMS, customQuery?: CUSTOM_QUERY) => Promise<REVIEW>;
  addReview: (params: REVIEW_ADD_PARAMS, customQuery?: CUSTOM_QUERY) => Promise<REVIEW>;
};

export function useReviewFactory<REVIEW, REVIEWS_SEARCH_PARAMS, REVIEW_ADD_PARAMS, CUSTOM_QUERY = any>(
  factoryParams: UseReviewFactoryParams<REVIEW, REVIEWS_SEARCH_PARAMS, REVIEW_ADD_PARAMS, CUSTOM_QUERY>
) {
  return function useReview(id: string): UseReview<REVIEW, REVIEWS_SEARCH_PARAMS, REVIEW_ADD_PARAMS, CUSTOM_QUERY> {
    const reviews: Ref<REVIEW> = sharedRef([], `useReviews-reviews-${id}`);
    const loading: Ref<boolean> = sharedRef(false, `useReviews-loading-${id}`);
    const error: Ref<string | null> = sharedRef(null, `useReviews-error-${id}`);

    const search = async (params?: REVIEWS_SEARCH_PARAMS, customQuery?: CUSTOM_QUERY): Promise<void> => {
      try {
        loading.value = true;
        reviews.value = await factoryParams.searchReviews(params, customQuery);
      } catch (searchError) {
        error.value = searchError.toString();
      } finally {
        loading.value = false;
      }
    };

    const addReview = async (params: REVIEW_ADD_PARAMS, customQuery?: CUSTOM_QUERY): Promise<void> => {
      try {
        loading.value = true;
        reviews.value = await factoryParams.addReview(params, customQuery);
      } catch (addError) {
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
