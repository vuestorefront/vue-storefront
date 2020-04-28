import { ProductSearchQuery } from '@aboutyou/backbone/types/ProductSearchQuery';
import { ProductsSearchEndpointParameters } from '@aboutyou/backbone/endpoints/products/products';

const mapProductSearchByQueryParams = (params): ProductsSearchEndpointParameters => {
  const searchQuery: ProductSearchQuery = {};

  if (params.catId) {
    searchQuery.categoryId = params.catId;
  }
  if (params.term) {
    searchQuery.term = params.term;
  }

  const pagination: { page?: number; perPage?: number} = {};

  if (params.page) {
    pagination.page = params.page;
  }
  if (params.perPage) {
    pagination.perPage = params.perPage;
  }

  return {
    with: {},
    where: searchQuery,
    sort: {},
    pagination: pagination
  };
};

export {
  mapProductSearchByQueryParams
};
