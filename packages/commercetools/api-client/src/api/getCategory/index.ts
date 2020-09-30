import gql from 'graphql-tag';
import defaultQuery from './defaultQuery';
import { CategoryQueryResult } from './../../types/GraphQL';
import { apolloClient, getCustomQuery, getSettings } from './../../index';
import { buildCategoryWhere, resolveCustomQueryVariables } from './../../helpers/search';

interface CategoryData {
  categories: CategoryQueryResult;
}

const getCategory = async (params, customQueryFn?) => {
  const { query, variables } = getCustomQuery(customQueryFn, defaultQuery);
  const { acceptLanguage } = getSettings();
  const resolvedVariables = resolveCustomQueryVariables(params ? {
    where: buildCategoryWhere(params),
    limit: params.limit,
    offset: params.offset,
    acceptLanguage
  } : { acceptLanguage }, variables, 'category');

  const request = await apolloClient.query<CategoryData>({
    query: gql`${query}`,
    variables: resolvedVariables,
    fetchPolicy: 'no-cache'
  });

  return {
    ...request,
    query,
    variables: resolvedVariables
  };
};

export default getCategory;
