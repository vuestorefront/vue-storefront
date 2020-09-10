import {
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
} from './../../src/getters/reviewGetters';

const review = {
  id: '1',
  version: 1,
  createdAt: (new Date()).toDateString(),
  lastModifiedAt: (new Date()).toDateString(),
  authorName: 'Jane D.Smith',
  text: 'I was looking for a bright light for the kitchen but wanted some item more modern than a strip light. this one is perfect, very bright and looks great. I can\'t comment on interlation as I had an electrition instal it. Would recommend',
  rating: 4
};

const reviews = {
  offset: 0,
  limit: 5,
  count: 1,
  total: 1,
  averageRating: 4,
  ratingsDistribution: {
    1: 0,
    2: 0,
    3: 0,
    4: 1,
    5: 0
  },
  results: [
    review
  ]
} as any;

describe('[commercetools-getters] review getters', () => {
  it('returns default values', () => {
    expect(getItems(null)).toEqual([]);
    expect(getReviewId(null)).toEqual('');
    expect(getReviewAuthor(null)).toEqual('');
    expect(getReviewMessage(null)).toEqual('');
    expect(getReviewRating(null)).toEqual(0);
    expect(getReviewDate(null)).toEqual('');
    expect(getTotalReviews(null)).toEqual(0);
    expect(getAverageRating(null)).toEqual(0);
    expect(getRatesCount(null)).toEqual([]);
    expect(getReviewsPage(null)).toEqual(1);
  });

  it('returns a list', () => {
    expect(getItems(reviews)).toEqual([review]);
  });

  it('returns id', () => {
    expect(getReviewId(review)).toEqual(review.id);
  });

  it('returns author', () => {
    expect(getReviewAuthor(review)).toEqual(review.authorName);
  });

  it('returns message', () => {
    expect(getReviewMessage(review)).toEqual(review.text);
  });

  it('returns rating', () => {
    expect(getReviewRating(review)).toEqual(review.rating);
  });

  it('returns date', () => {
    expect(getReviewDate(review)).toEqual(review.createdAt);
  });

  it('returns total number of reviews', () => {
    expect(getTotalReviews(reviews)).toEqual(reviews.total);
  });

  it('returns average rating', () => {
    expect(getAverageRating(reviews)).toEqual(reviews.averageRating);
  });

  it('returns number of reviews per rate', () => {
    expect(getRatesCount(reviews)).toEqual([
      {
        rate: 1,
        count: 0
      },
      {
        rate: 2,
        count: 0
      },
      {
        rate: 3,
        count: 0
      },
      {
        rate: 4,
        count: 1
      },
      {
        rate: 5,
        count: 0
      }
    ]);
  });

  it('returns reviews page number', () => {
    expect(getReviewsPage(reviews)).toEqual(1);
  });
});
