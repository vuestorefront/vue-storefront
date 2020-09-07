import { getReviews, addReview } from '@vue-storefront/commercetools-api';
import { Review } from './../types/GraphQL';
import { useReviewsFactory, UseReviews, UseReviewsFactoryParams } from '@vue-storefront/core';

const params: UseReviewsFactoryParams<any, any, any> = {
  searchReviews: async (params) => {
    const reviewsResponse = await getReviews(params);
    return reviewsResponse.data.reviews.results;
  },
  addReview: async (params) => {
    const reviewsResponse = await addReview(params);
    return reviewsResponse.data.reviews.results;
  }
};

const useReviews: (id: string) => UseReviews<Review, any, any> = useReviewsFactory<Review, any, any>(params);

export default useReviews;
