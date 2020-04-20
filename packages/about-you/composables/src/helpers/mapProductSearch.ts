import { getProduct } from '@vue-storefront/about-you-api';
import { BapiProduct } from '@aboutyou/backbone/types/BapiProduct';
import { ProductsSearchResult } from '@vue-storefront/core';

const mapProductSearch = async (params): Promise<ProductsSearchResult<BapiProduct>> => {
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

export default mapProductSearch;
