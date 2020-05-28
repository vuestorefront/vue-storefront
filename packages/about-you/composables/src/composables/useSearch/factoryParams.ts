import { UseSearchFactoryParams } from '../../factories/useSearchFactory';
import { SearchResults, SearchSuggestionsEndpointParameters } from '../../types';
import { getSearchSuggestions } from '@vue-storefront/about-you-api';

export const params: UseSearchFactoryParams<SearchResults, SearchSuggestionsEndpointParameters> = {
  search: async ({term, ...params}) => {
    const searchParams: Pick<SearchSuggestionsEndpointParameters, 'with' | 'campaignKey'> = {};

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

    const results = await getSearchSuggestions(term, searchParams);

    return {
      brands: results.brands,
      categories: results.categories,
      products: results.products,
      suggestions: results.productNames.map(record => ({ value: record.term }))
    };
  }
};
