import { ApolloQueryResult } from 'apollo-client';
import gql from 'graphql-tag';
import {apolloClient, getCustomQuery, getSettings} from './../../index';
import { CategoryQueryResult } from './../../types/GraphQL';
import defaultQuery from './defaultQuery';
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
  const request = await apolloClient.query<ApolloQueryResult<CategoryData>>({
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
