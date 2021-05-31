import { Context, CustomQuery } from '@vue-storefront/core';
import gql from 'graphql-tag';
import ApolloClient from 'apollo-client';
import { Store } from '../../types/GraphQL';
import { storeData } from './defaultQuery';

export interface GetStoreParams {
  key: string
}

export default async function getStore (context: Context, params: GetStoreParams, customQuery: CustomQuery) {

  const variables = {key: params.key};

  const { getStoreData } = context.extendQuery(customQuery, {
    getStoreData: { query: storeData, variables }
  });

  return await (context.client as ApolloClient<any>).query<Store>({
    query: gql`${getStoreData.query}`,
    variables: getStoreData.variables,
    fetchPolicy: 'no-cache'
  });
}
