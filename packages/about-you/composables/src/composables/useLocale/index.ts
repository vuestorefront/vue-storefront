/* istanbul ignore file */

import { UseLocale } from '@vue-storefront/interfaces';
import { useLocaleFactory } from '@vue-storefront/factories';

import { params } from './factoryParams';

const useLocale: () => UseLocale = useLocaleFactory(params);

export default useLocale;
