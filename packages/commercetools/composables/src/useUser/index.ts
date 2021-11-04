import { Customer } from '@vue-storefront/commercetools-api';
import { useUserFactory } from '@vue-storefront/core';
import { useUserFactoryParams } from './factoryParams';

/**
 * @remarks References:
 * {@link @vue-storefront/commercetools-api#Customer}
 */
const useUser = useUserFactory<Customer, any, any>(useUserFactoryParams);

export {
  useUser,
  useUserFactoryParams
};
