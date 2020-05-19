import { getProduct } from '@vue-storefront/boilerplate-api';
import { useProductFactory, ProductsSearchResult } from '@vue-storefront/core';
import { UseProduct, Product } from '../../types';

const productsSearch = async (params): Promise<ProductsSearchResult<Product, any>> => {
  const searchParams = {
    ids: params.ids,
    with: params.term,
    where: params.term,
    sort: params.sort,
    page: params.pagination.page,
    masterKey: '',
    term: params.term
  };

  const products = await getProduct(searchParams);

  return {
    data: products,
    total: products.length
  };
};

const useProduct: (cacheId: string) => UseProduct<Product, any> = useProductFactory<Product, any, any>({
  productsSearch
});

export default useProduct;
