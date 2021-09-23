import gql from 'graphql-tag';
import { ProductQueryResult } from '../../types/GraphQL';
import defaultQuery from './defaultQuery';
import { buildProductWhere } from '../../helpers/search';
import ApolloClient from 'apollo-client';
import { CustomQuery, Context } from '@vue-storefront/core';

export interface ProductData {
  products: ProductQueryResult;
}

/**
 * @remarks References:
 * {@link ProductData}
 */
const getProduct = async (context: Context, params, customQuery?: CustomQuery) => {
  const { locale, acceptLanguage, currency, country } = context.config;

  const defaultVariables = {
    where: buildProductWhere(context.config, params),
    skus: params.skus,
    limit: params.limit,
    offset: params.offset,
    channelId: params.channelId,
    locale,
    acceptLanguage,
    currency,
    country
  };

  const { products } = context.extendQuery(
    customQuery, { products: { query: defaultQuery, variables: defaultVariables } }
  );

  try {
    const request = await (context.client as ApolloClient<any>).query<ProductData>({
      query: gql`${products.query}`,
      variables: products.variables,
      // temporary, seems like bug in apollo:
      // @link: https://github.com/apollographql/apollo-client/issues/3234
      fetchPolicy: 'no-cache'
    });
    return request;
  } catch (error) {
    throw error.graphQLErrors?.[0] || error.networkError?.result || error;
  }

};

export default getProduct;
