import { useReviewFactory, UseReview, UseReviewFactoryParams } from '@vue-storefront/core';

const params: UseReviewFactoryParams<any, any, any> = {
  searchReviews: async () => Promise.resolve({}),
  addReview: async () => Promise.resolve({})
};

const useReview: (id: string) => UseReview<any, any, any> = useReviewFactory<any, any, any>(params);

export default useReview;
