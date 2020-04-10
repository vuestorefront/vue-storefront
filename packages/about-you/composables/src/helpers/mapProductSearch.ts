/* istanbul ignore file */

import { SearchResult } from '@vue-storefront/interfaces';
import { getProduct } from '@vue-storefront/about-you-api';
import { BapiProduct } from '@aboutyou/backbone/types/BapiProduct';

const mapProductSearch = async (params): Promise<SearchResult<BapiProduct>> => {
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
