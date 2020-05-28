import { useProductFactory } from '../../factories';
import { UseProduct, BapiProduct, ProductSearchQuery } from '../../types';
import { factoryParams } from './factoryParams';

const useProduct: (cacheId: string) => UseProduct<BapiProduct, any> = useProductFactory<BapiProduct, any, any, ProductSearchQuery>(factoryParams);

export default useProduct;
