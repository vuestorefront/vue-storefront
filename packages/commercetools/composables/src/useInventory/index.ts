import { useInventoryFactory, UseInventoryFactoryParams } from '../factories/useInventoryFactory';
import { InventoryEntry } from '@vue-storefront/commercetools-api/lib/src';
import { Context } from '@vue-storefront/core';

export const factoryParams: UseInventoryFactoryParams<InventoryEntry> = {
  load: async (context: Context, params: { id: string }) => {
    const result = await context.$ct.api.getInventory(params);
    return result.data.inventoryEntry;
  },
  search: async (context: Context, params: Record<string, string>) => {
    const result = await context.$ct.api.getInventory(params);
    return result.data.inventoryEntry;
  }
};

export default useInventoryFactory<InventoryEntry>(factoryParams);
