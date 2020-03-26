import mapPaginationParams from '../../src/helpers/internals/mapPaginationParams';

describe('[commercetools-composables] mapPaginationParams', () => {
  it('maps pagination params to format expected by CT gql API', () => {
    const input = { perPage: 20, page: 3 };
    expect(mapPaginationParams(input)).toEqual({ limit: 20, offset: 40 });
  });

  it('returns nothing if params are missing', () => {
    const input = { perPage: 2 };
    expect(mapPaginationParams(input)).toBeUndefined();
  });
});
