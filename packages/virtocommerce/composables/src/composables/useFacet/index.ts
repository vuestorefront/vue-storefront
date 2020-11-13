import { useFacetFactory, AgnosticFacetSearchParams, FacetSearchResult } from '@vue-storefront/core';
import { searchProducts, searchCategories, Product } from '@vue-storefront/virtocommerce-api';


const factoryParams = {
  search: async (params: FacetSearchResult<any>): Promise<any> => {

    console.log("search()");
    console.log(params);
    const categories = await searchCategories(params);
    if (params.input.categorySlug) {
      var category = categories?.data?.find(x => x.slug.endsWith(params.input.categorySlug));
      if (category) {
        params.input.outline  = category.outline;
      }
    }
    const result = await searchProducts(params);   

   
    return {
      input: params.input,
      categories: categories.data,
      products: result.data,
      total: result.total,
    };
  }
};

export default useFacetFactory<any>(factoryParams);

