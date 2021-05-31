import { useStoreFactory } from '@vue-storefront/core';
import { Store } from '../types/GraphQL';
import useStoreFactoryParams, { ChangeParam } from './factoryParams';

const useStore = useStoreFactory<Store, ChangeParam>(useStoreFactoryParams);

export {
  useStore,
  useStoreFactoryParams
};
