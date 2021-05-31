import { Context, CustomQuery } from '@vue-storefront/core';
import gql from 'graphql-tag';
import ApolloClient from 'apollo-client';
import { Store } from '../../types/GraphQL';
import { storesData } from './defaultQuery';

export interface GetStoresParams {
  keys: string[];
}

export default async function getStores (context: Context, params: GetStoresParams, customQuery: CustomQuery) {

  const variables = {keys: params.keys};

  const { getStoresData } = context.extendQuery(customQuery, {
    getStoreData: { query: storesData, variables }
  });

  return await (context.client as ApolloClient<any>).query<Store[]>({
    query: gql`${getStoresData.query}`,
    variables: getStoresData.variables,
    fetchPolicy: 'no-cache'
  });
}
