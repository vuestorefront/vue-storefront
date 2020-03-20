import { getProduct } from '@vue-storefront/about-you-api';
import { BapiProduct } from '@aboutyou/backbone/types/BapiProduct';

const mapProductSearch = async (params): Promise<BapiProduct[]> => {
  const searchParams = {
    ids: params.ids,
    with: params.term,
    where: params.term,
    sort: params.sort,
    page: params.pagination.page,
    masterKey: '',
    term: params.term
  };

  return await getProduct(searchParams);
};

export default mapProductSearch;
