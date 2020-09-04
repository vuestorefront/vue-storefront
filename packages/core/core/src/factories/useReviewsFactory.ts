import { Ref, computed } from '@vue/composition-api';
import { UseReviews } from '../types';
import { sharedRef } from '../utils';

export interface ReviewsResult<REVIEW> {
  data: REVIEW[];
  total: number;
  averageRating: number;
}

export declare type UseReviewsFactoryParams<REVIEW, REVIEWS_SEARCH_PARAMS, REVIEW_ADD_PARAMS> = {
  searchReviews: (params: REVIEWS_SEARCH_PARAMS) => Promise<ReviewsResult<REVIEW>>;
  addReview: (params: REVIEW_ADD_PARAMS) => Promise<ReviewsResult<REVIEW>>;
};

export function useReviewsFactory<REVIEW, REVIEWS_SEARCH_PARAMS, REVIEW_ADD_PARAMS>(
  factoryParams: UseReviewsFactoryParams<REVIEW, REVIEWS_SEARCH_PARAMS, REVIEW_ADD_PARAMS>
) {
  return function useReviews(id: string): UseReviews<REVIEW, REVIEWS_SEARCH_PARAMS, REVIEW_ADD_PARAMS> {
    const reviews: Ref<REVIEW[]> = sharedRef([], `useReviews-reviews-${id}`);
    const totalReviews: Ref<number> = sharedRef(0, `useReviews-totalReviews-${id}`);
    const averageRating: Ref<number> = sharedRef(0, `useReviews-averageRating-${id}`);
    const loading: Ref<boolean> = sharedRef(false, `useReviews-loading-${id}`);
    const error: Ref<any> = sharedRef(null, `useReviews-error-${id}`);

    const search = async (params?: REVIEWS_SEARCH_PARAMS): Promise<void> => {
      try {
        loading.value = true;
        const { data, total, averageRating: average } = await factoryParams.searchReviews(params);
        reviews.value = data;
        totalReviews.value = total;
        averageRating.value = average;
      } catch (searchError) {
        error.value = searchError.toString();
      } finally {
        loading.value = false;
      }
    };

    const add = async (params: REVIEW_ADD_PARAMS): Promise<void> => {
      try {
        loading.value = true;
        const { data, total, averageRating: average } = await factoryParams.addReview(params);
        reviews.value = data;
        totalReviews.value = total;
        averageRating.value = average;
      } catch (addError) {
        error.value = addError.toString();
      } finally {
        loading.value = false;
      }
    };

    return {
      search,
      add,
      reviews: computed(() => reviews.value),
      totalReviews: computed(() => totalReviews.value),
      averageRating: computed(() => averageRating.value),
      loading: computed(() => loading.value),
      error: computed(() => error.value)
    };
  };
}
