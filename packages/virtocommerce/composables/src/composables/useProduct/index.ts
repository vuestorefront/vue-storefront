// import { getProduct } from '@vue-storefront/boilerplate-api';
import { useProductFactory, ProductsSearchResult, AgnosticSortByOption } from '@vue-storefront/core';
import { UseProduct } from '../../types';
import { getProduct, Product } from '@vue-storefront/virtocommerce-api';

const availableSortingOptions = [
  { value: 'price-asc', label: 'Price from low to high' },
  { value: 'price-desc', label: 'Price from high to low' }
];

const productsSearch = async (params): Promise<ProductsSearchResult<Product, any, AgnosticSortByOption[]>> => {
  // const searchParams = {
  //   ids: params.ids,
  //   with: params.term,
  //   where: params.term,
  //   sort: params.sort,
  //   page: params.page,
  //   masterKey: '',
  //   term: params.term
  // };

  const products = await getProduct(params);

  return {
    data: products.data,
    total: products.total,
    availableSortingOptions
  };
};

const useProduct: (cacheId: string) => UseProduct<Product, any, AgnosticSortByOption[]> = useProductFactory<Product, any, any, AgnosticSortByOption[]>({
  productsSearch
});

export default useProduct;
