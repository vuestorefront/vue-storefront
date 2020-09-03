import { useReviewsFactory } from '../../src/factories';
import { UseReviews } from '../../src/types';

const useReviews: (cacheId: string) => UseReviews = useReviewsFactory<any>({
  searchReviews: jest.fn().mockResolvedValueOnce({
    data: [{ id: '123' }],
    total: 1
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

    expect(reviews.value).toEqual([{ id: '123' }]);
    expect(totalReviews.value).toEqual(1);
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
