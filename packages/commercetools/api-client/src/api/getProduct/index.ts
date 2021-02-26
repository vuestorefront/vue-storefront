import gql from 'graphql-tag';
import { ProductQueryResult } from '../../types/GraphQL';
import defaultQuery from './defaultQuery';
import { buildProductWhere } from '../../helpers/search';
import ApolloClient from 'apollo-client';
import { CustomQuery } from '@vue-storefront/core';

export interface ProductData {
  products: ProductQueryResult;
}

const getProduct = async (context, params, customQuery?: CustomQuery) => {
  const { locale, acceptLanguage, currency, country } = context.config;
  const defaultVariables = {
    where: buildProductWhere(context.config, params),
    skus: params.skus,
    limit: params.limit,
    offset: params.offset,
    locale,
    acceptLanguage,
    currency,
    country
  };

  const { products } = context.extendQuery(
    customQuery, { products: { query: defaultQuery, variables: defaultVariables } }
  );

  const request = await (context.client as ApolloClient<any>).query<ProductData>({
    query: gql`${products.query}`,
    variables: products.variables,
    // temporary, seems like bug in apollo:
    // @link: https://github.com/apollographql/apollo-client/issues/3234
    fetchPolicy: 'no-cache'
  });
  return request;
};

export default getProduct;
