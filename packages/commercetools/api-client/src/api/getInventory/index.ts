import { Context, CustomQuery } from '@vue-storefront/core';
import ApolloClient from 'apollo-client';
import gql from 'graphql-tag';

import { ApiResponseWrapper } from '../../types/Api';
import { InventoryEntryQueryResult } from '../../types/GraphQL';
import { inventoryEntriesData } from './defaultQuery';
import { buildInventoryEntriesWhere } from '../../helpers/search';

export interface GetInventoryParams {
  sku: string;
  customQuery: CustomQuery;
}

/**
 * @remarks References:
 * {@link GetInventoryParams}, {@link InventoryEntryQueryResult}
 */
export default async function getInventory(context: Context, params?: GetInventoryParams): Promise<InventoryEntryQueryResult> {
  const variables = {
    where: buildInventoryEntriesWhere(context.config, params)
  };

  const { customQuery } = Object(params);

  const { getInventoryEntriesData } = context.extendQuery(customQuery, {
    getInventoryEntriesData: { query: inventoryEntriesData, variables }
  });

  const response = await (context.client as ApolloClient<any>).query<ApiResponseWrapper<'inventory', InventoryEntryQueryResult>>({
    query: gql`${getInventoryEntriesData.query}`,
    variables: getInventoryEntriesData.variables,
    fetchPolicy: 'no-cache'
  });

  return response.data.inventory;
}
