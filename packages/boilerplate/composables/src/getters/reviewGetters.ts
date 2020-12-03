import { ReviewGetters, AgnosticRateCount } from '@vue-storefront/core';

type Review = any;
type ReviewItem = any;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getItems = (review: Review): ReviewItem[] => [];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getReviewId = (item: ReviewItem): string => '';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getReviewAuthor = (item: ReviewItem): string => '';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getReviewMessage = (item: ReviewItem): string => '';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getReviewRating = (item: ReviewItem): number => 0;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getReviewDate = (item: ReviewItem): string => '';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getTotalReviews = (review: Review): number => 0;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getAverageRating = (review: Review): number => 0;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getRatesCount = (review: Review): AgnosticRateCount[] => [];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getReviewsPage = (review: Review): number => 1;

const reviewGetters: ReviewGetters<Review, ReviewItem> = {
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
