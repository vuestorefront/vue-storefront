import { UseInventory, useInventoryFactory, UseInventoryFactoryParams } from '../factories/useInventoryFactory';
import { InventoryEntryQueryResult } from '@vue-storefront/commercetools-api';
import { Context } from '@vue-storefront/core';

const useInventoryFactoryParams: UseInventoryFactoryParams<InventoryEntryQueryResult> = {
  load: async (context: Context, params: { id: string }) => {
    return await context.$ct.api.getInventory(params);
  },
  search: async (context: Context, params: Record<string, string>) => {
    return await context.$ct.api.getInventory({ ...params });
  }
};

const useInventory: (cacheId: string) => UseInventory<InventoryEntryQueryResult> = useInventoryFactory<InventoryEntryQueryResult>(useInventoryFactoryParams);

export {
  useInventory,
  useInventoryFactoryParams
};
