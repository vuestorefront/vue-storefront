import gql from 'graphql-tag';
import { acceptLanguage, apolloClient, country, currency, locale } from './../../index';
import { ProductQueryResult } from './../../types/GraphQL';
import defaultQuery from './defaultQuery';
import { buildProductWhere } from './../../helpers/search';

interface ProductData {
  products: ProductQueryResult;
}

const getProduct = async (params, resolveQuery = async (query = defaultQuery, variables = {}) => {
  return await apolloClient.query<ProductData>({
    query: gql`${query}`,
    variables: {
      where: buildProductWhere(params),
      skus: params.skus,
      limit: params.limit,
      offset: params.offset,
      locale,
      acceptLanguage,
      currency,
      country,
      ...variables
    },
    // temporary, seems like bug in apollo:
    // @link: https://github.com/apollographql/apollo-client/issues/3234
    fetchPolicy: 'no-cache'
  });
}) => {
  return resolveQuery();
};

export default getProduct;
