import { UseInventory, useInventoryFactory, UseInventoryFactoryParams } from '../factories/useInventoryFactory';
import { InventoryEntry } from '@vue-storefront/commercetools-api';
import { Context } from '@vue-storefront/core';

const useInventoryFactoryParams: UseInventoryFactoryParams<InventoryEntry> = {
  load: async (context: Context, params: { id: string }) => {
    const result = await context.$ct.api.getInventory(params);
    return result;
  },
  search: async (context: Context, params: Record<string, string>) => {
    console.log('params', params);
    const result = await context.$ct.api.getInventory({ sku: 'M0E20000000DPZ0'});
    console.log(result);
    return result;
  }
};

const useInventory: (cacheId: string) => UseInventory<InventoryEntry> = useInventoryFactory<InventoryEntry>(useInventoryFactoryParams);

export {
  useInventory,
  useInventoryFactoryParams
};
