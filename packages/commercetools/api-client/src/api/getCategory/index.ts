import { ApolloQueryResult } from 'apollo-client';
import gql from 'graphql-tag';
import { apolloClient, getSettings } from './../../index';
import { CategoryQueryResult } from './../../types/GraphQL';
import defaultQuery from './defaultQuery';
import { buildCategoryWhere, resolveCustomQueryVariables } from './../../helpers/search';

interface CategoryData {
  categories: CategoryQueryResult;
}

const getCategory = async (params, customQuery = async (query = defaultQuery, variables = {}) => {
  const { acceptLanguage } = getSettings();
  const resolvedVariables = resolveCustomQueryVariables({
    where: buildCategoryWhere(params),
    limit: params.limit,
    offset: params.offset,
    acceptLanguage
  }, variables);
  const request = await apolloClient.query<ApolloQueryResult<CategoryData>>({
    query: gql`${query}`,
    variables: resolvedVariables,
    fetchPolicy: 'no-cache'
  });
  return {
    query,
    variables: resolvedVariables,
    ...request
  };
}) => {
  return customQuery();
};

export default getCategory;
