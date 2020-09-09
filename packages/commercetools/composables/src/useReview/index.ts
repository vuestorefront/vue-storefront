import { getReview, addReview } from '@vue-storefront/commercetools-api';
import { Review } from './../types/GraphQL';
import { useReviewFactory, UseReview, UseReviewFactoryParams } from '@vue-storefront/core';

const params: UseReviewFactoryParams<any, any, any> = {
  searchReviews: (params) => {
    return getReview(params);
  },
  addReview: (params) => {
    return addReview(params);
  }
};

const useReview: (id: string) => UseReview<Review, any, any> = useReviewFactory<Review, any, any>(params);

export default useReview;
