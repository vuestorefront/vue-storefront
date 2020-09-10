import { ReviewGetters, AgnosticRateCount } from '@vue-storefront/core';

type Review = any;
type ReviewItem = any;

export const getItems = (review: Review): ReviewItem[] => review?.results || [];

export const getReviewId = (item: ReviewItem): string => item?.id || '';

export const getReviewAuthor = (item: ReviewItem): string => item?.authorName || '';

export const getReviewMessage = (item: ReviewItem): string => item?.text || '';

export const getReviewRating = (item: ReviewItem): number => item?.rating || 0;

export const getReviewDate = (item: ReviewItem): string => item?.createdAt || '';

export const getTotalReviews = (review: Review): number => review?.total || 0;

export const getAverageRating = (review: Review): number => review?.averageRating || 0;

export const getRatesCount = (review: Review): AgnosticRateCount[] => review?.ratingsDistribution || [];

export const getReviewsPage = (review: Review): number => review ? (review.offset / review.limit) + 1 : 1;

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
