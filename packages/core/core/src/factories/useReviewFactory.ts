import { Ref, computed } from '@vue/composition-api';
import { CustomQuery, UseReview, Context, FactoryParams, UseReviewErrors } from '../types';
import { sharedRef, Logger, generateContext } from '../utils';

export interface UseReviewFactoryParams<REVIEW, REVIEWS_SEARCH_PARAMS, REVIEW_ADD_PARAMS> extends FactoryParams {
  searchReviews: (context: Context, params: REVIEWS_SEARCH_PARAMS & { customQuery?: CustomQuery }) => Promise<REVIEW>;
  addReview: (context: Context, params: REVIEW_ADD_PARAMS & { customQuery?: CustomQuery }) => Promise<REVIEW>;
}

export function useReviewFactory<REVIEW, REVIEWS_SEARCH_PARAMS, REVIEW_ADD_PARAMS>(
  factoryParams: UseReviewFactoryParams<REVIEW, REVIEWS_SEARCH_PARAMS, REVIEW_ADD_PARAMS>
) {
  return function useReview(id: string): UseReview<REVIEW, REVIEWS_SEARCH_PARAMS, REVIEW_ADD_PARAMS> {
    const reviews: Ref<REVIEW> = sharedRef([], `useReviews-reviews-${id}`);
    const loading: Ref<boolean> = sharedRef(false, `useReviews-loading-${id}`);
    const error: Ref<UseReviewErrors> = sharedRef({}, `useProduct-error-${id}`);
    const context = generateContext(factoryParams);

    const search = async (searchParams): Promise<void> => {
      Logger.debug(`useReview/${id}/search`, searchParams);

      try {
        loading.value = true;
        error.value.search = null;
        reviews.value = await factoryParams.searchReviews(context, searchParams);
      } catch (err) {
        error.value.search = err;
        Logger.error(`useReview/${id}/search`, err);
      } finally {
        loading.value = false;
      }
    };

    const addReview = async (params): Promise<void> => {
      Logger.debug('useReview.addReview', params);

      try {
        loading.value = true;
        error.value.addReview = null;
        reviews.value = await factoryParams.addReview(context, params);
      } catch (err) {
        error.value.addReview = err;
        Logger.error(`useReview/${id}/addReview`, err);
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
