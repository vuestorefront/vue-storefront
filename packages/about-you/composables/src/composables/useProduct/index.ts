import {AgnosticSortByOption, UseProduct, useProductFactory} from '@vue-storefront/core';
import { BapiProduct, Filter } from '../../types';
import { params } from './factoryParams';

const useProduct: (cacheId: string) => UseProduct<BapiProduct, Record<string, Filter>, AgnosticSortByOption[]> = useProductFactory<BapiProduct, any, Record<string, Filter>, AgnosticSortByOption[]>(params);

export default useProduct;
