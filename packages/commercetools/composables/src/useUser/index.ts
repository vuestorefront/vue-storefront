import {
  Customer
} from '../types/GraphQL';

import { params } from './factoryParams';
import { useUserFactory } from '@vue-storefront/core';

export default useUserFactory<Customer, any, any>(params);
