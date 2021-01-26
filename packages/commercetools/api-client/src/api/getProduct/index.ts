import gql from 'graphql-tag';
import { CustomQueryFn } from '../../index';
import { ProductQueryResult } from '../../types/GraphQL';
import defaultQuery from './defaultQuery';
import { buildProductWhere } from '../../helpers/search';
import { getCustomQuery } from '../../helpers/queries';
import ApolloClient from 'apollo-client';

export interface ProductData {
  products: ProductQueryResult;
}

const getProduct = async (context, params, customQueryFn?: CustomQueryFn) => {
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
  const { query, variables } = getCustomQuery(customQueryFn, { defaultQuery, defaultVariables });
  const request = await (context.client as ApolloClient<any>).query<ProductData>({
    query: gql`${query}`,
    variables,
    // temporary, seems like bug in apollo:
    // @link: https://github.com/apollographql/apollo-client/issues/3234
    fetchPolicy: 'no-cache'
  });
  return request;
};

export default getProduct;
