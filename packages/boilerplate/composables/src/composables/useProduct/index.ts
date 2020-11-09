import { UseProduct, Product } from '../../types';
import { useProductFactory, ProductsSearchResult } from '@vue-storefront/core';

const productsSearch = async (): Promise<ProductsSearchResult<Product>> => ({
  data: [],
  total: 0
});

const useProduct: (cacheId: string) => UseProduct<Product> = useProductFactory<Product, any>({
  productsSearch
});

export default useProduct;
