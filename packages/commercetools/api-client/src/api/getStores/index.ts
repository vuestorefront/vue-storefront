import { Context, CustomQuery } from '@vue-storefront/core';
import ApolloClient from 'apollo-client';
import gql from 'graphql-tag';

import { ApiResponseWrapper } from '../../types/Api';
import { StoreQueryResult } from '../../types/GraphQL';
import { storesData } from './defaultQuery';

export interface GetStoresParams {
  customQuery: CustomQuery;
}

/**
 * @remarks References:
 * {@link GetStoresParams}, {@link StoreQueryResult}
 */
export default async function getStores(context: Context, params?: GetStoresParams): Promise<StoreQueryResult> {
  const variables = { locale: context.config.locale };
  const { customQuery } = Object(params);

  const { getStoresData } = context.extendQuery(customQuery, {
    getStoresData: { query: storesData, variables }
  });

  const response = await (context.client as ApolloClient<any>).query<ApiResponseWrapper<'stores', StoreQueryResult>>({
    query: gql`${getStoresData.query}`,
    variables: getStoresData.variables,
    fetchPolicy: 'no-cache'
  });

  return response.data.stores;
}
