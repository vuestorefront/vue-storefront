import { CategoryBySlugEndpointParameters } from '@aboutyou/backbone/endpoints/categories/categoryBySlug';

const mapCategorySearchByPathParams = (params): Pick<CategoryBySlugEndpointParameters, 'with'> => {
  return {
    with: params.with
  };
};

export default mapCategorySearchByPathParams;
