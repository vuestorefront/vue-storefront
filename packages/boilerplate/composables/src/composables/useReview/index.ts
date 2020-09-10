import { getReview, addReview } from '@vue-storefront/boilerplate-api';
import { Review } from './../../types';
import { useReviewFactory, UseReview, UseReviewFactoryParams } from '@vue-storefront/core';

const params: UseReviewFactoryParams<any, any, any> = {
  searchReviews: getReview,
  addReview: addReview
};

const useReview: (cacheId: string) => UseReview<Review, any, any> = useReviewFactory<Review, any, any>(params);

export default useReview;
