import { getProduct } from '@vue-storefront/salesforce-cc-poc-api';
import { useProductFactory, ProductsSearchResult, AgnosticSortByOption } from '@vue-storefront/core';
import { UseProduct } from '../../types';
import { Product } from '@vue-storefront/salesforce-cc-poc-api/src/types';

const productsSearch = async (...params): Promise<ProductsSearchResult<Product, any, AgnosticSortByOption[]>> => {
  console.log(params);
  // const searchParams = {
  //   ids: params.ids,
  //   with: params.term,
  //   where: params.term,
  //   sort: params.sort,
  //   page: params.page,
  //   masterKey: '',
  //   term: params.term
  // };

  const { data } = await getProduct(params);
  const { productSearch } = data;
  const availableSortingOptions = productSearch.sortingOptions.map(f => {
    return { label: f.label, value: f.id };
  });
  const mappedProducts: Product[] = productSearch.productHits;
  return {
    data: mappedProducts,
    // TODO: add the pagination info to graphql
    total: mappedProducts.length,
    availableSortingOptions
  };
};

const useProduct: (cacheId: string) => UseProduct<Product, any, AgnosticSortByOption[]> = useProductFactory<Product, any, any, AgnosticSortByOption[]>({
  productsSearch
});

export default useProduct;
