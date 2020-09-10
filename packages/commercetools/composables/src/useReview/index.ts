import { useReviewFactory, UseReview, UseReviewFactoryParams } from '@vue-storefront/core';

const params: UseReviewFactoryParams<any, any, any> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  searchReviews: async (params?) => {
    console.log('Mocked: searchReviews');
    return {};
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addReview: async (params) => {
    console.log('Mocked: addReview');
    return {};
  }
};

const useReview: (cacheId: string) => UseReview<any, any, any> = useReviewFactory<any, any, any>(params);

export { useReview };
