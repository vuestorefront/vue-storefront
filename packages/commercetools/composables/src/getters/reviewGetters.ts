/* istanbul ignore file */

import { ReviewGetters, AgnosticRateCount } from '@vue-storefront/core';
import { ReviewQueryResult, Review } from '@vue-storefront/commercetools-api';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getItems = (review: ReviewQueryResult): Review[] => [];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getReviewId = (item: Review): string => '';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getReviewAuthor = (item: Review): string => '';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getReviewMessage = (item: Review): string => '';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getReviewRating = (item: Review): number => 0;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getReviewDate = (item: Review): string => '';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getTotalReviews = (review: ReviewQueryResult): number => 0;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getAverageRating = (review: ReviewQueryResult): number => 0;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getRatesCount = (review: ReviewQueryResult): AgnosticRateCount[] => [];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getReviewsPage = (review: ReviewQueryResult): number => 1;

const reviewGetters: ReviewGetters<ReviewQueryResult, Review> = {
  getItems,
  getReviewId,
  getReviewAuthor,
  getReviewMessage,
  getReviewRating,
  getReviewDate,
  getTotalReviews,
  getAverageRating,
  getRatesCount,
  getReviewsPage
};

export default reviewGetters;
