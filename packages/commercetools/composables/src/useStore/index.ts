import { useStoreFactory } from '@vue-storefront/core';
import useStoreFactoryParams, { ChangeParam } from './factoryParams';
import { StoresData } from '../types';

const useStore = useStoreFactory<StoresData, ChangeParam>(useStoreFactoryParams);

export {
  useStore,
  useStoreFactoryParams
};
