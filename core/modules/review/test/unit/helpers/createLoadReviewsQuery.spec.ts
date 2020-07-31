import createLoadReviewsQuery from '../../../helpers/createLoadReviewsQuery'

const SearchQuery = {
  applyFilter: jest.fn(() => SearchQuery)
}

jest.mock('storefront-query-builder', () => ({
  SearchQuery: function () {
    return SearchQuery
  }
}));

describe('createLoadReviewsQuery', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('add filter only for productId argument', () => {
    createLoadReviewsQuery({ productId: 123, approved: false })

    expect(SearchQuery.applyFilter).toBeCalledTimes(1)
    expect(SearchQuery.applyFilter).toBeCalledWith({ key: 'product_id', value: { 'eq': 123 } });
  });

  it('add filter for productId and approved arguments', () => {
    createLoadReviewsQuery({ productId: 123, approved: true })

    expect(SearchQuery.applyFilter).toBeCalledTimes(2)
    expect(SearchQuery.applyFilter).toBeCalledWith({ key: 'product_id', value: { 'eq': 123 } });
    expect(SearchQuery.applyFilter).toBeCalledWith({ key: 'review_status', value: { 'eq': 1 } });
  });
})
