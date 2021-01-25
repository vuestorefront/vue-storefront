import { useFacetFactory, FacetSearchResult, Context } from '@vue-storefront/core';


const factoryParams = {
  search: async (context: Context, params: FacetSearchResult<any>): Promise<any> => {

    console.log("search()");
    console.log(params);
    const categories = await context.$vc.api.searchCategories(context, params);
    if (params.input.categorySlug) {
      var category = categories?.data?.find(x => x.slug.endsWith(params.input.categorySlug));
      if (category) {
        params.input.outline  = category.outline;
      }
    }
    const result = await context.$vc.api.searchProducts(context, params);   

   
    return {
      input: params.input,
      categories: categories.data,
      products: result.data,
      total: result.total,
    };
  }
};

export default useFacetFactory<any>(factoryParams);

