import { useStoreFactory } from '@vue-storefront/core';
import { StoreQueryResult } from '../types/GraphQL';
import useStoreFactoryParams, { ChangeParam } from './factoryParams';

const useStore = useStoreFactory<StoreQueryResult, ChangeParam>(useStoreFactoryParams);

export {
  useStore,
  useStoreFactoryParams
};
