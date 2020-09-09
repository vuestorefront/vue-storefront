import { Review } from '../types/GraphQL';
import { ReviewGetters } from '@vue-storefront/core';

export const getReviewId = (review: Review): string => review?.id || '';

export const getReviewAuthor = (review: Review): string => review?.authorName || '';

export const getReviewMessage = (review: Review): string => review?.text || '';

export const getReviewRating = (review: Review): number => review?.rating || 0;

export const getReviewDate = (review: Review): string => review?.createdAt || '';

const reviewGetters: ReviewGetters<Review> = {
  getReviewId,
  getReviewAuthor,
  getReviewMessage,
  getReviewRating,
  getReviewDate
};

export default reviewGetters;
