import { getReview, addReview } from '@vue-storefront/commercetools-api';
import { Versioned, Scalars } from './../types/GraphQL';
import { useReviewFactory, UseReview, UseReviewFactoryParams } from '@vue-storefront/core';

type Review = {
  offset: number;
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

const params: UseReviewFactoryParams<any, any, any> = {
  searchReviews: (params) => {
    return getReview(params);
  },
  addReview: (params) => {
    return addReview(params);
  }
};

const useReview: (id: string) => UseReview<ReviewItem, any, any> = useReviewFactory<ReviewItem, any, any>(params);

export default useReview;
