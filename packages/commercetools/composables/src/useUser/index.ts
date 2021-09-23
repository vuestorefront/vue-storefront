import {
  Customer
} from '../types/GraphQL';

import { useUserFactoryParams } from './factoryParams';
import { useUserFactory } from '@vue-storefront/core';

/**
 * @remarks References:
 * {@link Customer}
 */
const useUser = useUserFactory<Customer, any, any>(useUserFactoryParams);

export {
  useUser,
  useUserFactoryParams
};
