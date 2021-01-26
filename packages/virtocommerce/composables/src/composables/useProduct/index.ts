// import { getProduct } from '@vue-storefront/boilerplate-api';
import { useProductFactory,  Context, UseProductFactoryParams } from '@vue-storefront/core';
import { ProductsSearchParams} from '../../types';
import { Product } from '@vue-storefront/virtocommerce-api';

const availableSortingOptions = [
  { value: 'price-asc', label: 'Price from low to high' },
  { value: 'price-desc', label: 'Price from high to low' }
];


const params: UseProductFactoryParams<Product, ProductsSearchParams> = {
  productsSearch: async (context: Context, params: ProductsSearchParams): Promise<any> => {
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
  }
};

export default useProductFactory<Product, ProductsSearchParams>(params);