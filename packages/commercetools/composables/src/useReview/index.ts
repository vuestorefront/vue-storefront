/* istanbul ignore file */

import {
  useReviewFactory,
  UseReview,
  UseReviewFactoryParams,
  Context
} from '@vue-storefront/core';

import { GetCommentsParams, CommentType } from '../types';

const params: UseReviewFactoryParams<CommentType[], GetCommentsParams, any> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  searchReviews: async (context: Context, params) => {
    const { data, error } = await context.$ct.api.getComments(params);
    if (error) throw error;
    return data;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addReview: async (context: Context, params) => {
    console.log('Mocked: addReview');
    return {} as CommentType[];
  }
};

const useReview: (
  cacheId: string
) => UseReview<CommentType[], GetCommentsParams, any> = useReviewFactory<
  CommentType[],
  GetCommentsParams,
  any
>(params);

export default useReview;
