/* istanbul ignore file */

import { UseLocale } from '@vue-storefront/core';
import { useLocaleFactory } from '@vue-storefront/core';

import { params } from './factoryParams';

const useLocale: () => UseLocale = useLocaleFactory(params);

export default useLocale;
