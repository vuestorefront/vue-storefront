/* istanbul ignore file */

import { useReviewFactory, UseReview, UseReviewFactoryParams } from '@vue-storefront/core';

const factoryParams: UseReviewFactoryParams<any, any, any, any> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  searchReviews: async (context, params) => {
    console.log('Mocked: searchReviews');
    return {};
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addReview: async (context, params) => {
    console.log('Mocked: addReview');
    return {};
  }
};

const useReview: (cacheId: string) => UseReview<any, any, any> = useReviewFactory<any, any, any, any>(factoryParams);

export { useReview };
export { default as reviewGetters } from '../getters/reviewGetters';
