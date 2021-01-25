// import { getProduct } from '@vue-storefront/boilerplate-api';
import { useProductFactory, ProductsSearchResult, UseProduct, Context } from '@vue-storefront/core';
import { ProductsSearchParams} from '../../types';
import { Product } from '@vue-storefront/virtocommerce-api';

const availableSortingOptions = [
  { value: 'price-asc', label: 'Price from low to high' },
  { value: 'price-desc', label: 'Price from high to low' }
];

const productsSearch = async (context: Context, params: any): Promise<ProductsSearchResult<Product>> => {
  // const searchParams = {
  //   ids: params.ids,
  //   with: params.term,
  //   where: params.term,
  //   sort: params.sort,
  //   page: params.page,
  //   masterKey: '',
  //   term: params.term
  // };

  const products = await context.$vc.api.getProduct(context, params);

  return {
    data: products.data,
    total: products.total,
  };
};

const useProduct: (cacheId: string) => UseProduct<Product> = useProductFactory<Product, ProductsSearchParams>({
  productsSearch
});

export default useProduct;
