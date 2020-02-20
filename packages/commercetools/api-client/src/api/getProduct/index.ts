import { ApolloQueryResult } from 'apollo-client';
import gql from 'graphql-tag';
import { apolloClient, locale, currency } from './../../index';
import { ProductSearch } from './../../types/Api';
import { ProductQueryResult } from './../../types/GraphQL';
import defaultQuery from './defaultQuery';
import { buildProductWhere } from './../../helpers/search';

interface ProductData {
  products: ProductQueryResult;
}

const getProduct = async (search: ProductSearch): Promise<ApolloQueryResult<ProductData>> => {
  if (search.customQuery) {
    const { query, variables } = search.customQuery;

    return await apolloClient.query<ProductData>({
      query: gql`${query}`,
      variables
    });
  }

  return await apolloClient.query<ProductData>({
    query: defaultQuery,
    variables: {
      where: buildProductWhere(search),
      skus: search.skus,
      limit: search.limit,
      offset: search.offset,
      locale,
      currency
    },
    // temporary, seems like bug in apollo:
    // @link: https://github.com/apollographql/apollo-client/issues/3234
    fetchPolicy: 'no-cache'
  });

};

export default getProduct;
