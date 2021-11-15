import { useStoreFactory } from '@vue-storefront/core';
import useStoreFactoryParams from './factoryParams';
import { StoresData } from '../types';

/**
 * @remarks References:
 * {@link StoresData}
 */
const useStore = useStoreFactory<StoresData>(useStoreFactoryParams);

export {
  useStore,
  useStoreFactoryParams
};
