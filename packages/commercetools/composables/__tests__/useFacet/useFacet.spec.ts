import useFacet from '../../src/useFacet';
// import enhanceProducts from './../../src/helpers/internals/enhanceProduct';
import { getProduct, getCategory } from '@vue-storefront/commercetools-api';
// import { useFacetFactory, FacetSearchData } from '@vue-storefront/core';
import { enhanceProduct, getFiltersFromProductsAttributes } from './../../src/helpers/internals';

jest.mock('./../../src/helpers/internals', () => ({
  enhanceProduct: jest.fn((productResponse) => ({ ...productResponse, _variants: [] })),
  getFiltersFromProductsAttributes: jest.fn()
}));

jest.mock('@vue-storefront/commercetools-api', () => ({
  AttributeType: {
    STRING: 1
  },
  getProduct: jest.fn(() => ({
    data: {
      products: {
        results: [{ id: 1, name: 'prod1' }]
      }
    }
  })),
  getCategory: jest.fn(() => ({
    data: {
      categories: {
        results: [{ id: 1, name: 'cat1' }]
      }
    }
  }))
}));

jest.mock('@vue-storefront/core', () => ({
  useFacetFactory: (factoryParams) => () => {

    return {
      search: factoryParams.search
    };
  }
}));

describe('[commercetools-composables] useFacet', () => {
  it('triggers faceting search', async () => {
    const { search } = useFacet();

    await search({
      input: {
        itemsPerPage: [10, 20, 50],
        categorySlug: 'cat-1',
        filters: {
          color: ['blue', 'green'],
          size: ['s', 'm']
        }
      }
    } as any);

    expect(getCategory).toBeCalled();
    expect(getProduct).toBeCalled();
    expect(enhanceProduct).toBeCalled();
    expect(getFiltersFromProductsAttributes).toBeCalled();
  });
});
