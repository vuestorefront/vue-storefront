import { UseProduct, useProductFactory } from '@vue-storefront/core';
import { BapiProduct } from '../../types';
import { params } from './factoryParams';

const useProduct: (cacheId: string) => UseProduct<BapiProduct> = useProductFactory<BapiProduct, any>(params);

export default useProduct;
