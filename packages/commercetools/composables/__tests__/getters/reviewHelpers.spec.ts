import {
  getReviewId,
  getReviewAuthor,
  getReviewMessage,
  getReviewRating,
  getReviewDate
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

describe('[commercetools-getters] review getters', () => {
  it('returns default values', () => {
    expect(getReviewId(null)).toBe('');
    expect(getReviewAuthor(null)).toBe('');
    expect(getReviewMessage(null)).toBe('');
    expect(getReviewRating(null)).toBe(0);
    expect(getReviewDate(null)).toBe('');
  });

  it('returns id', () => {
    expect(getReviewId(review)).toBe(review.id);
  });

  it('returns author', () => {
    expect(getReviewAuthor(review)).toBe(review.authorName);
  });

  it('returns message', () => {
    expect(getReviewMessage(review)).toBe(review.text);
  });

  it('returns rating', () => {
    expect(getReviewRating(review)).toBe(review.rating);
  });

  it('returns date', () => {
    expect(getReviewDate(review)).toBe(review.createdAt);
  });
});
