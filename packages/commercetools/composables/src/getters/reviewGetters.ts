import { Versioned, Scalars } from '../types/GraphQL';
import { ReviewGetters, AgnosticRateCount } from '@vue-storefront/core';

// TODO: Replace types below with GraphQL types when they get updated
type Review = {
  offset: number;
  limit: number;
  count: number;
  total: number;
  averageRating: number;
  ratingsDistribution: {
    [rating: string]: number;
  };
  results: ReviewItem[];
};

type ReviewItem = Versioned & {
  authorName: Scalars['String'];
  text: Scalars['String'];
  rating: Scalars['Int'];
};

export const getItems = (review: Review): ReviewItem[] => review?.results || [];

export const getReviewId = (item: ReviewItem): string => item?.id || '';

export const getReviewAuthor = (item: ReviewItem): string => item?.authorName || '';

export const getReviewMessage = (item: ReviewItem): string => item?.text || '';

export const getReviewRating = (item: ReviewItem): number => item?.rating || 0;

export const getReviewDate = (item: ReviewItem): string => item?.createdAt || '';

export const getTotalReviews = (review: Review): number => review?.total || 0;

export const getAverageRating = (review: Review): number => review?.averageRating || 0;

export const getRatesCount = (review: Review): AgnosticRateCount[] => {
  const rates = review?.ratingsDistribution || [];

  return Object.entries(rates).map(([rate, count]): AgnosticRateCount => ({
    rate: Number(rate),
    count
  }));
};

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
