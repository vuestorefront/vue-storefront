import gql from 'graphql-tag';
import { apolloClient, getCustomQuery, getSettings } from './../../index';
import { ProductQueryResult } from './../../types/GraphQL';
import defaultQuery from './defaultQuery';
import { buildProductWhere, resolveCustomQueryVariables } from './../../helpers/search';
import { ApolloQueryResult } from 'apollo-client';

export interface ProductData {
  products: ProductQueryResult;
}

const getProduct = async (params, customQueryFn?) => {
  const { query, variables } = getCustomQuery(customQueryFn, defaultQuery);
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
    ...request,
    query,
    variables: resolvedVariables
  };
};

export default getProduct;
