import { getProduct } from '@vue-storefront/salesforce-cc-poc-api';
import { useProductFactory, ProductsSearchResult, AgnosticSortByOption } from '@vue-storefront/core';
import { UseProduct } from '../../types';
import { ProductVariant } from '@vue-storefront/salesforce-cc-poc-api/src/types';

const productsSearch = async (...params): Promise<ProductsSearchResult<ProductVariant, any, AgnosticSortByOption[]>> => {
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
  console.log(productSearch.productHits);
  const mappedProducts: ProductVariant[] = productSearch.productHits.map(orgPr => {
    return {
      _id: parseInt(orgPr.productId),
      _description: orgPr.productName,
      _categoriesRef: [],
      name: orgPr.productName,
      sku: orgPr.productId,
      images: [
        orgPr.image.link
      ],
      price: {
        original: orgPr.prices.sale ? orgPr.prices.sale : orgPr.prices.list,
        current: orgPr.prices.sale ? orgPr.prices.sale : orgPr.prices.list
      }
    };
  });
  console.log(mappedProducts);
  return {
    data: mappedProducts,
    total: mappedProducts.length,
    availableSortingOptions
  };
};

const useProduct: (cacheId: string) => UseProduct<ProductVariant, any, AgnosticSortByOption[]> = useProductFactory<ProductVariant, any, any, AgnosticSortByOption[]>({
  productsSearch
});

export default useProduct;
