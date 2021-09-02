import { useStoreFactory } from '@vue-storefront/core';
import useStoreFactoryParams from './factoryParams';
import { StoresData } from '../types';

const useStore = useStoreFactory<StoresData>(useStoreFactoryParams);

export {
  useStore,
  useStoreFactoryParams
};
