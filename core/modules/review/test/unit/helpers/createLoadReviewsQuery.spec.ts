import createLoadReviewsQuery from '../../../helpers/createLoadReviewsQuery'

const SearchQuery = {
  _appliedFilters: [],
  applyFilter: jest.fn(({key, value}) => ({
    ...SearchQuery,
    _appliedFilters: [{
      attribute: key,
      value: value
    }]
  }))
}

jest.mock('@vue-storefront/core/lib/search/searchQuery', () => () => SearchQuery)

describe('createLoadReviewsQuery', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('add filter for product_id attribute', () => {
    const query = createLoadReviewsQuery({ productId: 1, approved: false })

    expect(query._appliedFilters[0].attribute).toBe('product_id');
    expect(query._appliedFilters[0].value).toEqual({'eq': 1});
  });

  it('add filter for review_status attribute', () => {
    const query = createLoadReviewsQuery({ productId: 1, approved: true })

    expect(query._appliedFilters[0].attribute).toBe('review_status');
    expect(query._appliedFilters[0].value).toEqual({'eq': 1});
  });
})
