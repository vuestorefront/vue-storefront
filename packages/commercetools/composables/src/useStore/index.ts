import { useStoreFactory } from '@vue-storefront/core';
import useStorefactoryParams from './factoryParams';

const useStore = useStoreFactory<any, any>(useStorefactoryParams);

export {
  useStore,
  useStorefactoryParams
};
