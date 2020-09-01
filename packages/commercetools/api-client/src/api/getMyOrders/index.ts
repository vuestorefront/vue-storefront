import { apolloClient, getSettings } from './../../index';
import defaultQuery from './defaultQuery';
import { buildOrderWhere, resolveCustomQueryVariables } from './../../helpers/search';
import { ProfileResponse } from './../../types/Api';
import { ApolloQueryResult } from 'apollo-client';
import gql from 'graphql-tag';

const getOrders = async (params, customQuery = async (query = defaultQuery, variables = {}) => {
  const { locale, acceptLanguage } = getSettings();
  const resolvedVariables = resolveCustomQueryVariables({
    where: buildOrderWhere(params),
    sort: params.sort,
    limit: params.limit,
    offset: params.offset,
    acceptLanguage,
    locale
  }, variables);
  const request = await apolloClient.query<ApolloQueryResult<ProfileResponse>>({
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

export default getOrders;
