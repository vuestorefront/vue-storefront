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

  let filters;

  if (params.filters) {
    filters = Object.keys(params.filters).map(filter => {
      const options = params.filters[filter].options?.filter(option => option.selected);
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

  console.log(refinedSearchQuery);

  return {
    with: {
      advancedAttributes: {
        withKey: ['productName']
      },
      priceRange: true
    },
    where: refinedSearchQuery,
    sort: {},
    pagination: pagination
  };
};

export {
  mapProductSearchByQueryParams
};
