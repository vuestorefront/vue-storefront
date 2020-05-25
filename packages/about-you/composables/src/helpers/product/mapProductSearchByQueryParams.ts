import { ProductSearchQuery, ProductsSearchEndpointParameters, ProductSortConfig } from '../../types';

const mapProductSearchByQueryParams = (params): ProductsSearchEndpointParameters => {
  const searchQuery: ProductSearchQuery = {};

  if (params.catId) {
    searchQuery.categoryId = params.catId;
  }
  if (params.term) {
    searchQuery.term = params.term;
  }

  const sortOptions: ProductSortConfig = {};
  if (params.sort) {
    const [option, direction] = params.sort.split('-');
    sortOptions.by = option;
    sortOptions.direction = direction;
  }

  const pagination: { page?: number; perPage?: number} = {};

  if (params.page) {
    pagination.page = params.page;
  }
  if (params.perPage) {
    pagination.perPage = params.perPage;
  }

  return {
    with: {
      attributes: 'all',
      advancedAttributes: 'all',
      variants: 'all',
      images: 'all',
      siblings: 'all',
      categories: 'all',
      priceRange: true
    },
    where: searchQuery,
    sort: sortOptions,
    pagination: pagination
  };
};

export {
  mapProductSearchByQueryParams
};
