import { useReviewsFactory } from '../../src/factories';
import { UseReviews } from '../../src/types';

const useReviews: (cacheId: string) => UseReviews<any, any, any> = useReviewsFactory<any, any, any>({
  searchReviews: jest.fn().mockResolvedValue({
    data: [{ id: '123' }],
    total: 1,
    averageRating: 4.7
  }),
  addReview: jest.fn().mockResolvedValue({
    data: [{ id: '123' }, { id: '456' }],
    total: 2,
    averageRating: 4.8
  })
});

const useReviesError: (cacheId: string) => UseReviews<any, any, any> = useReviewsFactory<any, any, any>({
  searchReviews: jest.fn().mockImplementation(() => {
    throw new Error('Couldn\'t retrieve reviews');
  }),
  addReview: jest.fn().mockImplementation(() => {
    throw new Error('Couldn\'t submit review');
  })
});

describe('[CORE - factories] useReviews', () => {
  it('returns proper initial values', () => {
    const { reviews, totalReviews, averageRating, loading, error } = useReviews('test-reviews');

    expect(reviews.value).toEqual([]);
    expect(totalReviews.value).toEqual(0);
    expect(loading.value).toEqual(false);
    expect(averageRating.value).toEqual(0);
    expect(error.value).toEqual(null);
  });

  it('returns reviews response', async () => {
    const { search, reviews, totalReviews, averageRating, error } = useReviews('test-reviews');

    await search();

    expect(reviews.value).toEqual([{ id: '123' }]);
    expect(totalReviews.value).toEqual(1);
    expect(averageRating.value).toEqual(4.7);
    expect(error.value).toEqual(null);
  });

  it('can submit new review', async () => {
    const { search, add, totalReviews } = useReviews('test-reviews');

    await search();

    expect(totalReviews.value).toEqual(1);

    await add({});

    expect(totalReviews.value).toEqual(2);
  });

  it('returns error when search fails', async () => {
    const { search, reviews, totalReviews, loading, error } = useReviesError('test-reviews');

    await search();

    expect(reviews.value).toEqual([]);
    expect(totalReviews.value).toEqual(0);
    expect(loading.value).toEqual(false);
    expect(error.value).toEqual('Error: Couldn\'t retrieve reviews');
  });

  it('returns error when submit fails', async () => {
    const { add, reviews, totalReviews, loading, error } = useReviesError('test-reviews');

    await add({});

    expect(reviews.value).toEqual([]);
    expect(totalReviews.value).toEqual(0);
    expect(loading.value).toEqual(false);
    expect(error.value).toEqual('Error: Couldn\'t submit review');
  });
});
