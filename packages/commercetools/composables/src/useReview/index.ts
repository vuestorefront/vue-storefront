/* istanbul ignore file */

import { useReviewFactory, UseReview, UseReviewFactoryParams, Context } from '@vue-storefront/core';

const params: UseReviewFactoryParams<any, any, any> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  searchReviews: async (context: Context, { customQuery, ...searchParams }) => {
    console.log('Mocked: searchReviews');
    return {};
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addReview: async (context: Context, { customQuery, ...addParams }) => {
    console.log('Mocked: addReview');
    return {};
  }
};

const useReview: (cacheId: string) => UseReview<any, any, any> = useReviewFactory<any, any, any>(params);

export { useReview };
