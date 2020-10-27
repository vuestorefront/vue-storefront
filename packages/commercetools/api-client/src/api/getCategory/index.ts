import gql from 'graphql-tag';
import defaultQuery from './defaultQuery';
import { CategoryQueryResult } from '../../types/GraphQL';
import { CustomQueryFn, getSettings } from '../../index';
import { buildCategoryWhere } from '../../helpers/search';
import { getCustomQuery } from '../../helpers/queries';

interface CategoryData {
  categories: CategoryQueryResult;
}

const getCategory = async (params, customQueryFn?: CustomQueryFn) => {
  const { acceptLanguage, client } = getSettings();
  const defaultVariables = params ? {
    where: buildCategoryWhere(params),
    limit: params.limit,
    offset: params.offset,
    acceptLanguage
  } : { acceptLanguage };

  const { query, variables } = getCustomQuery(customQueryFn, { defaultQuery, defaultVariables });

  const request = await client.query<CategoryData>({
    query: gql`${query}`,
    variables,
    fetchPolicy: 'no-cache'
  });

  return request;
};

export default getCategory;
