import { Context, useFacetFactory } from '@vue-storefront/core';

const factoryParams = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  search: async (context: Context, params) => {
    console.log('Mocked: searchFacet');
    return {};
  }
};

export default useFacetFactory<any>(factoryParams);
