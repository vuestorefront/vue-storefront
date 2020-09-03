import { useReviewsFactory } from '../../src/factories';
import { UseReviews } from '../../src/types';

const reviewsData = [
  {
    id: '123',
    author: 'First Last',
    date: new Date(),
    message: 'Review Message',
    rating: 5
  }
];

const useReviews: (cacheId: string) => UseReviews = useReviewsFactory<any>({
  searchReviews: jest.fn().mockResolvedValueOnce({
    data: reviewsData,
    total: reviewsData.length
  })
});

const useReviesError: (cacheId: string) => UseReviews = useReviewsFactory<any>({
  searchReviews: jest.fn().mockImplementation(() => {
    throw new Error();
  })
});

describe('[CORE - factories] useReviews', () => {
  it('returns proper initial values', () => {
    const { reviews, totalReviews, loading, error } = useReviews('test-reviews');

    expect(reviews.value).toEqual([]);
    expect(totalReviews.value).toEqual(0);
    expect(loading.value).toEqual(false);
    expect(error.value).toEqual(null);
  });

  it('returns reviews response', async () => {
    const { search, reviews, totalReviews, error } = useReviews('test-reviews');

    await search();

    expect(reviews.value).toEqual(reviewsData);
    expect(totalReviews.value).toEqual(reviewsData.length);
    expect(error.value).toEqual(null);
  });

  it('returns error when search fails', async () => {
    const { search, reviews, totalReviews, loading, error } = useReviesError('test-reviews');

    await search();

    expect(reviews.value).toEqual([]);
    expect(totalReviews.value).toEqual(0);
    expect(loading.value).toEqual(false);
    expect(error.value).toBeInstanceOf(Error);
  });
});
