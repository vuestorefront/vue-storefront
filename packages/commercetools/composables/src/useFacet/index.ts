import { useFacetFactory, FacetSearchData } from '@vue-storefront/core';
import { getProduct, getCategory, AttributeType } from '@vue-storefront/commercetools-api';
import { enhanceProduct, getFiltersFromProductsAttributes } from './../helpers/internals';
import { ProductVariant } from './../types/GraphQL';
import { FacetSearchInput, FacetResultsData } from './../types';

const factoryParams = {
  search: async (params: FacetSearchData<FacetResultsData, FacetSearchInput>): Promise<FacetResultsData> => {
    const perPageOptions = [20, 40, 100];
    const itemsPerPage = params.input.itemsPerPage;

    const categoryResponse = await getCategory({ slug: params.input.categorySlug });
    const categories = categoryResponse.data.categories.results;
    const inputFilters = params.input.filters;
    const filters = Object.keys(inputFilters).reduce((prev, curr) => ([
      ...prev,
      ...inputFilters[curr].map(value => ({ type: AttributeType.STRING, name: curr, value }))
    ]), []);

    const productResponse = await getProduct({
      catId: categories[0].id,
      limit: itemsPerPage,
      offset: (params.input.page - 1) * itemsPerPage,
      filters
      // TODO: https://github.com/DivanteLtd/vue-storefront/issues/4857
      // sort: params.sort
    });
    const enhancedProductResponse = enhanceProduct(productResponse);
    const products = (enhancedProductResponse.data as any)._variants as ProductVariant[];
    const availableFilters = getFiltersFromProductsAttributes(products);

    return {
      products,
      categories,
      availableFilters,
      totalHits: productResponse.data.products.total,
      perPageOptions,
      itemsPerPage
    };
  }
};

export default useFacetFactory<FacetResultsData, FacetSearchInput>(factoryParams);
