import { Ref, computed } from '@vue/composition-api';
import { UseReviews, AgnosticProductReview } from '../types';
import { sharedRef } from '../utils';

export interface ReviewsSearchResult {
    data: AgnosticProductReview[];
    total: number;
}

export declare type UseReviewsFactoryParams<REVIEWS_SEARCH_PARAMS> = {
    searchReviews: (params: REVIEWS_SEARCH_PARAMS) => Promise<ReviewsSearchResult>;
};

export function useReviewsFactory<REVIEWS_SEARCH_PARAMS>(factoryParams: UseReviewsFactoryParams<REVIEWS_SEARCH_PARAMS>) {
  return function useReviews(id: string): UseReviews {
    const reviews: Ref<AgnosticProductReview[]> = sharedRef([], `useReviews-reviews-${id}`);
    const totalReviews: Ref<number> = sharedRef(0, `useReviews-totalReviews-${id}`);
    const loading: Ref<boolean> = sharedRef(false, `useReviews-loading-${id}`);
    const error: Ref<any> = sharedRef(null, `useReviews-error-${id}`);

    const search = async (params?: REVIEWS_SEARCH_PARAMS): Promise<void> => {
      try {
        loading.value = true;
        const { data, total } = await factoryParams.searchReviews(params);
        reviews.value = data;
        totalReviews.value = total;
      } catch (searchError) {
        error.value = searchError;
      } finally {
        loading.value = false;
      }
    };

    return {
      reviews: computed(() => reviews.value),
      search,
      totalReviews: computed(() => totalReviews.value),
      loading: computed(() => loading.value),
      error: computed(() => error.value)
    };
  };
}
