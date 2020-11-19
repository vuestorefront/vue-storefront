import {
  Customer
} from '../types/GraphQL';

import { params } from './factoryParams';
import { useUserFactory } from '@vue-storefront/core';

const { useUser } = useUserFactory<Customer, any, any>(params);

export { useUser };
