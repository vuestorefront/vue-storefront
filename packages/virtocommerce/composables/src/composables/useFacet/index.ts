import { useFacetFactory, FacetSearchResult } from '@vue-storefront/core';
import { getProduct, Product } from '@vue-storefront/virtocommerce-api';

// TODO: move to the config file
const ITEMS_PER_PAGE = [20, 40, 100];

const factoryParams = {
  search: async (params): Promise<any> => { 

    const result = await getProduct(params);   

    return {
      products: result.data,
      total: result.total,
    };
  }
};

export default useFacetFactory<any>(factoryParams);

