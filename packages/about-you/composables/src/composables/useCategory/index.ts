import { getCategory } from '@vue-storefront/about-you-api';
import { useCategoryFactory } from '@vue-storefront/factories';
import { UseCategory, BapiCategory } from '../../types';

const useCategory: (id: string) => UseCategory<BapiCategory> = useCategoryFactory<BapiCategory, any>({
  categorySearch: getCategory
});

export default useCategory;
