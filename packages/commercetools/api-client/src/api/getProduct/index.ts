import gql from 'graphql-tag';
import { apolloClient, getSettings } from './../../index';
import { ProductQueryResult } from './../../types/GraphQL';
import defaultQuery from './defaultQuery';
import { buildProductWhere, resolveCustomQueryVariables } from './../../helpers/search';
import { ApolloQueryResult } from 'apollo-client';

interface ProductData {
  products: ProductQueryResult;
}

const getProduct = async (params, customQuery = async (query = defaultQuery, variables = {}) => {
  console.log('test')
  const { locale, acceptLanguage, currency, country } = getSettings();
  const resolvedVariables = resolveCustomQueryVariables({
    where: buildProductWhere(params),
    skus: params.skus,
    limit: params.limit,
    offset: params.offset,
    locale,
    acceptLanguage,
    currency,
    country
  }, variables);
  const request = await apolloClient.query<ApolloQueryResult<ProductData>>({
    query: gql`${query}`,
    variables: resolvedVariables,
    // temporary, seems like bug in apollo:
    // @link: https://github.com/apollographql/apollo-client/issues/3234
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

export default getProduct;
