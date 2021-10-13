import {
  Context, useStoreFactory, UseStoreFactoryParams
} from '@vue-storefront/core';
import type { StoresData } from '@vue-storefront/boilerplate-api';

const params: UseStoreFactoryParams<StoresData> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  load: async (context: Context, params) => {
    console.log('Mocked: useStore.load');
    return {};
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  change: async (context: Context, params) => {
    console.log('Mocked: useStore.change');
    return {};
  }
};

export const useStore = useStoreFactory<StoresData>(params);
