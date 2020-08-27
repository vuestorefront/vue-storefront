import { getProductList, getProductDetails } from '@vue-storefront/salesforce-cc-poc-api';
import { useProductFactory, ProductsSearchResult, AgnosticSortByOption } from '@vue-storefront/core';
import { UseProduct } from '../../types';
import { Product, ProductHit } from '@vue-storefront/salesforce-cc-poc-api/src/types';
import { ProductsSearchParams } from '@vue-storefront/salesforce-cc-poc-api/lib/types';

const productsSearch = async (params: ProductsSearchParams): Promise<ProductsSearchResult<Product | ProductHit, any, AgnosticSortByOption[]>> => {
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

  if (params.id) {
    // product details
    const productDetails = await getProductDetails(params);
    console.log(productDetails);
    return {
      data: [productDetails],
      total: 1,
      availableSortingOptions: []
    };
  } else {
    // product search
    const searchResult = await getProductList(params);
    const availableSortingOptions = searchResult.sortingOptions.map(f => {
      return { label: f.label, value: f.id };
    });
    return {
      data: (searchResult.productHits.map(ph => {
        return { ...ph, id: ph.productId, name: ph.productName };
      })),
      // TODO: add the pagination info to graphql
      total: searchResult.productHits.length,
      availableSortingOptions
    };
  }
};

const useProduct: (cacheId: string) => UseProduct<Product | ProductHit, any, AgnosticSortByOption[]> = useProductFactory<Product | ProductHit, any, any, AgnosticSortByOption[]>({
  productsSearch
});

export default useProduct;
