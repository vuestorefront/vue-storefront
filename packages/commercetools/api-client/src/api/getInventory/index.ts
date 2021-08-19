import { Context, CustomQuery } from '@vue-storefront/core';
import ApolloClient from 'apollo-client';
import gql from 'graphql-tag';
import { InventoryEntryQueryResult } from '../../types/GraphQL';
import { inventoryEntriesData } from './defaultQuery';
import { ApiResponseWrapper } from '../../types/Api';
// import { buildInventoryEntriesWhere } from '../../helpers/search';

// export interface InventoryData {
//   inventory: InventoryEntryQueryResult;
// }

const getInventory = async (context: Context, params: Record<string, string>, customQuery?: CustomQuery) => {
  const variables = {
    ...(params?.sku && { where: `sku="${params?.sku}"` })
  };

  const { getInventoryEntriesData } = context.extendQuery(customQuery, {
    getInventoryEntriesData: { query: inventoryEntriesData, variables }
  });

  const response = await (context.client as ApolloClient<any>).query<ApiResponseWrapper<'inventoryEntries', InventoryEntryQueryResult>>({
    query: gql`${getInventoryEntriesData.query}`,
    variables: getInventoryEntriesData.variables,
    fetchPolicy: 'no-cache'
  });

  return response.data.inventoryEntries;
};

export default getInventory;
