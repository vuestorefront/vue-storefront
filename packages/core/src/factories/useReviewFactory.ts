import { Ref, computed } from '@nuxtjs/composition-api';
import { CustomQuery, UseReview, Context, FactoryParams, UseReviewErrors, PlatformApi } from '../types';
import { sharedRef, Logger, configureFactoryParams } from '../utils';

export interface UseReviewFactoryParams<
  REVIEW,
  REVIEWS_SEARCH_PARAMS,
  REVIEW_ADD_PARAMS,
  API extends PlatformApi = any
> extends FactoryParams<API> {
  searchReviews: (context: Context, params: REVIEWS_SEARCH_PARAMS & { customQuery?: CustomQuery }) => Promise<REVIEW>;
  addReview: (context: Context, params: REVIEW_ADD_PARAMS & { customQuery?: CustomQuery }) => Promise<REVIEW>;
}

export function useReviewFactory<REVIEW, REVIEWS_SEARCH_PARAMS, REVIEW_ADD_PARAMS, API extends PlatformApi = any>(
  factoryParams: UseReviewFactoryParams<REVIEW, REVIEWS_SEARCH_PARAMS, REVIEW_ADD_PARAMS, API>
) {
  return function useReview(id: string): UseReview<REVIEW, REVIEWS_SEARCH_PARAMS, REVIEW_ADD_PARAMS> {
    const reviews: Ref<REVIEW> = sharedRef([], `useReviews-reviews-${id}`);
    const loading: Ref<boolean> = sharedRef(false, `useReviews-loading-${id}`);
    const error: Ref<UseReviewErrors> = sharedRef({
      search: null,
      addReview: null
    }, `useReviews-error-${id}`);

    const _factoryParams = configureFactoryParams(
      factoryParams,
      { mainRef: reviews, alias: 'currentReviews', loading, error }
    );

    const search = async (searchParams): Promise<void> => {
      Logger.debug(`useReview/${id}/search`, searchParams);

      try {
        loading.value = true;
        reviews.value = await _factoryParams.searchReviews(searchParams);
        error.value.search = null;
      } catch (err) {
        error.value.search = err;
        Logger.error(`useReview/${id}/search`, err);
      } finally {
        loading.value = false;
      }
    };

    const addReview = async (params): Promise<void> => {
      Logger.debug(`useReview/${id}/addReview`, params);

      try {
        loading.value = true;
        reviews.value = await _factoryParams.addReview(params);
        error.value.addReview = null;
      } catch (err) {
        error.value.addReview = err;
        Logger.error(`useReview/${id}/addReview`, err);
      } finally {
        loading.value = false;
      }
    };

    return {
      api: _factoryParams.api,
      search,
      addReview,
      reviews: computed(() => reviews.value),
      loading: computed(() => loading.value),
      error: computed(() => error.value)
    };
  };
}
