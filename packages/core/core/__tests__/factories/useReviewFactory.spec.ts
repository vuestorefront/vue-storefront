import { useReviewFactory } from '../../src/factories';
import { UseReview } from '../../src/types';

const searchReviewResponse = {
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
    {
      id: '1',
      version: 1,
      createdAt: (new Date()).toDateString(),
      lastModifiedAt: (new Date()).toDateString(),
      authorName: 'Jane D.Smith',
      text: 'I was looking for a bright light for the kitchen but wanted some item more modern than a strip light. this one is perfect, very bright and looks great. I can\'t comment on interlation as I had an electrition instal it. Would recommend',
      rating: 4
    }
  ]
};

const useReviews: (cacheId: string) => UseReview<any, any, any> = useReviewFactory<any, any, any>({
  searchReviews: jest.fn().mockResolvedValue(searchReviewResponse),
  addReview: jest.fn().mockResolvedValue({
    offset: 0,
    limit: 5,
    count: 2,
    total: 2,
    averageRating: 4.5,
    ratingsDistribution: {
      1: 0,
      2: 0,
      3: 0,
      4: 1,
      5: 1
    },
    results: [
      {
        id: '1',
        version: 1,
        createdAt: (new Date()).toDateString(),
        lastModifiedAt: (new Date()).toDateString(),
        authorName: 'Jane D.Smith',
        text: 'I was looking for a bright light for the kitchen but wanted some item more modern than a strip light. this one is perfect, very bright and looks great. I can\'t comment on interlation as I had an electrition instal it. Would recommend',
        rating: 4
      },
      {
        id: '2',
        version: 1,
        createdAt: (new Date()).toDateString(),
        lastModifiedAt: (new Date()).toDateString(),
        authorName: 'Mari',
        text: 'Excellent light output from this led fitting. Relatively easy to fix to the ceiling,but having two people makes it easier, to complete the installation. Unable to comment on reliability at this time, but I am hopeful of years of use with good light levels. Excellent light output from this led fitting. Relatively easy to fix to the ceiling,',
        rating: 5
      }
    ]
  })
});

const useReviesError: (cacheId: string) => UseReview<any, any, any> = useReviewFactory<any, any, any>({
  searchReviews: jest.fn().mockImplementation(() => {
    throw new Error('Couldn\'t retrieve reviews');
  }),
  addReview: jest.fn().mockImplementation(() => {
    throw new Error('Couldn\'t submit review');
  })
});

describe('[CORE - factories] useReviews', () => {
  it('returns proper initial values', () => {
    const { reviews, loading, error } = useReviews('test-reviews');

    expect(reviews.value).toEqual([]);
    expect(loading.value).toEqual(false);
    expect(error.value).toEqual({});
  });

  it('returns reviews response', async () => {
    const { search, reviews, error } = useReviews('test-reviews');

    await search({});

    expect(reviews.value).toEqual(searchReviewResponse);
    expect(error.value).toEqual({ search: null });
  });

  it('can submit new review', async () => {
    const { search, addReview, reviews } = useReviews('test-reviews');

    await search({});

    expect(reviews.value.total).toEqual(1);

    await addReview({});

    expect(reviews.value.total).toEqual(2);
  });

  it('returns error when search fails', async () => {
    const { search, reviews, loading, error } = useReviesError('test-reviews');

    await search({});

    expect(reviews.value).toEqual([]);
    expect(loading.value).toEqual(false);
    expect(error.value.search.toString()).toEqual('Error: Couldn\'t retrieve reviews');
  });

  it('returns error when submit fails', async () => {
    const { addReview, reviews, loading, error } = useReviesError('test-reviews');

    await addReview({});

    expect(reviews.value).toEqual([]);
    expect(loading.value).toEqual(false);
    expect(error.value.addReview.toString()).toEqual('Error: Couldn\'t submit review');
  });
});
