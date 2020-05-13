import { useCategoryFactory } from '@vue-storefront/core';
import { UseCategory, BapiCategory } from '../../types';
import { params } from './factoryParams';

const useCategory: (id: string) => UseCategory<BapiCategory> = useCategoryFactory<BapiCategory, any>(params);

export default useCategory;
