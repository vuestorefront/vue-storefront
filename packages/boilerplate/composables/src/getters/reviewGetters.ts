import { ReviewGetters, AgnosticRateCount } from '@vue-storefront/core';
import type { Review, ReviewItem } from '@vue-storefront/boilerplate-api';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getItems (review: Review): ReviewItem[] {
  return [];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getReviewId(item: ReviewItem): string {
  return '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getReviewAuthor(item: ReviewItem): string {
  return '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getReviewMessage(item: ReviewItem): string {
  return '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getReviewRating(item: ReviewItem): number {
  return 0;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getReviewDate(item: ReviewItem): string {
  return '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getTotalReviews(review: Review): number {
  return 0;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getAverageRating(review: Review): number {
  return 0;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getRatesCount(review: Review): AgnosticRateCount[] {
  return [];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getReviewsPage(review: Review): number {
  return 0;
}

export const reviewGetters: ReviewGetters<Review, ReviewItem> = {
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
