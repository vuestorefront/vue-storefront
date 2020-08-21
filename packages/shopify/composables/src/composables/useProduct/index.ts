import { getProduct } from '@vue-storefront/shopify-api';
import { useProductFactory, ProductsSearchResult, AgnosticSortByOption } from '@vue-storefront/core';
import { UseProduct, Product } from '../../types';

const availableSortingOptions = [
  { value: 'createdAt', label: 'Latest' },
  { value: 'price-asc', label: 'Price from low to high' },
  { value: 'price-desc', label: 'Price from high to low' },
  { value: 'bestSelling', label: 'Best selling' }
];

const productsSearch = async (params): Promise<ProductsSearchResult<Product, any, AgnosticSortByOption[]>> => {
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
    total: products.length,
    availableSortingOptions
  };
};

const useProduct: (cacheId: string) => UseProduct<Product, any, AgnosticSortByOption[]> = useProductFactory<Product, any, any, AgnosticSortByOption[]>({
  productsSearch
});

export default useProduct;
