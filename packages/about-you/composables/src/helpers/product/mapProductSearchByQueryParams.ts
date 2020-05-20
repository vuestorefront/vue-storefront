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

  console.log('params', params);
  console.log('searchQuery', searchQuery);
  // const refinedSearchQuery: ProductSearchQuery = {
  //   attributes: [
  //     {
  //       type: "attributes",
  //       key: firstAttributeFilter.slug, // "color" (see step 1)
  //       values: [firstAttributeFilter.values[0].id] // ID of color pink
  //     }
  //   ]
  // };

  return {
    with: {
      advancedAttributes: {
        withKey: ['productName']
      },
      priceRange: true
    },
    where: searchQuery,
    sort: {},
    pagination: pagination
  };
};

export {
  mapProductSearchByQueryParams
};
