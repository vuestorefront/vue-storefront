import { getProduct } from '@vue-storefront/shopify-api';
import { useProductFactory, ProductsSearchResult } from '@vue-storefront/core';
import { UseProduct, Product } from '../../types';

const productsSearch = async (params): Promise<ProductsSearchResult<Product>> => {
  const searchParams = {
    ids: params.ids,
    with: params.term,
    where: params.term,
    sort: params.sort,
    page: params.pagination && params.pagination.page ? params.pagination.page : 0,
    masterKey: '',
    term: params.term,
    id: params.id,
    handle: params.handle,
    slug: params.slug,
    customQuery: params.customQuery
  };

  const products = await getProduct(searchParams);

  return {
    data: JSON.parse(JSON.stringify(products)),
    total: products.length
  };
};

const useProduct: (cacheId: string) => UseProduct<Product> = useProductFactory<Product, any>({
  productsSearch
});

export default useProduct;
