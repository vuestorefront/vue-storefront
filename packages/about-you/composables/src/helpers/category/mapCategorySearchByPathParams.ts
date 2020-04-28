import { CategoryBySlugEndpointParameters } from '@aboutyou/backbone/endpoints/categories/categoryBySlug';

const mapCategorySearchByPathParams = (params): Pick<CategoryBySlugEndpointParameters, 'with'> => {
  const searchQuery: Pick<CategoryBySlugEndpointParameters, 'with'> = {};

  if (params.with) {
    searchQuery.with = params.with;
  }

  return searchQuery;
};

export {
  mapCategorySearchByPathParams
};
