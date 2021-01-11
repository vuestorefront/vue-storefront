import { Context, useFacetFactory, FacetSearchResult } from '@vue-storefront/core';

const factoryParams = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  search: async (context: Context, params: FacetSearchResult<any>) => {
    console.log('Mocked: searchFacet');
    return {};
  }
};

export default useFacetFactory<any>(factoryParams);
