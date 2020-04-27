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

  return {
    with: {},
    where: searchQuery,
    sort: {},
    pagination: {}
  };
};

export {
  mapProductSearchByQueryParams
};
