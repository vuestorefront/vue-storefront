import { UseSearchFactoryParams } from '../../factories/useSearchFactory';
import { SearchResults } from '../../types';
import { getProduct } from '@vue-storefront/shopify-api';

export const params: UseSearchFactoryParams<SearchResults, any> = {
  search: async ({term, ...params}) => {
    const searchParams: any = {};

    if (params.with) {
      searchParams.with = params.with;
    } else {
      searchParams.with = {
        brands: 'all',
        categories: 'all',
        productNames: 'all',
        products: 'all'
      };
    }
    searchParams.customQuery = {first: 20, sortKey: 'CREATED_AT', reverse: true, query: term};
    const results = await getProduct(searchParams);

    return {
      brands: [{
        id: 123,
        label: '',
        value: ''
      }],
      categories: [{}],
      products: results,
      suggestions: results.map(record => ({ value: record.title }))
    };
  }
};
