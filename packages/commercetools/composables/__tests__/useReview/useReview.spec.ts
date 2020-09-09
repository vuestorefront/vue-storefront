import useReview from './../../src/useReview';
import { getReview } from '@vue-storefront/commercetools-api';

const reviewResponse = {
  data: [
    {
      id: '1',
      text: 'This product is great!',
      rating: 5
    },
    {
      id: '2',
      text: 'This product is meh.',
      rating: 1
    }
  ],
  averageRating: 3,
  total: 2
};

jest.mock('@vue-storefront/commercetools-api', () => ({
  getReview: jest.fn(() => Promise.resolve(reviewResponse))
}));

jest.mock('@vue-storefront/core', () => ({
  useReviewFactory: (params) => () => params
}));

describe('[commercetools-composables] useReview', () => {
  it('loads reviews', async() => {
    const { searchReviews } = useReview('test-review') as any;

    const response = await searchReviews({ id: '123' });

    expect(response).toEqual(reviewResponse);
    expect(getReview).toBeCalledWith({ id: '123' });
  });
});
