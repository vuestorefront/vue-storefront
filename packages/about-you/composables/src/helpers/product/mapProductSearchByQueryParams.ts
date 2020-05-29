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

  if (params.filters?.prices) {
    const { prices } = params.filters;
    searchQuery.minPrice = prices.options[0].min;
    searchQuery.maxPrice = prices.options[0].max;
  }

  const pagination: { page?: number; perPage?: number} = {};

  if (params.page) {
    pagination.page = params.page;
  }
  if (params.perPage) {
    pagination.perPage = params.perPage;
  }

  let filters;
  if (params.filters) {
    filters = Object.keys(params.filters).map(filter => {
      const options = params.filters[filter].options.filter(option => option.selected);
      return {
        type: 'attributes',
        key: params.filters[filter].slug,
        values: options.map(option => option.id)
      };
    });
  }

  const refinedSearchQuery: ProductSearchQuery = {
    ...searchQuery,
    attributes: filters
  };

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
    where: refinedSearchQuery,
    sort: sortOptions,
    pagination: pagination
  };
};

export {
  mapProductSearchByQueryParams
};
