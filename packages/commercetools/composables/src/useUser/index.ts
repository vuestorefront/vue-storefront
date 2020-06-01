import {
  Customer
} from '@vue-storefront/commercetools-api/lib//types/GraphQL';

import { params } from './factoryParams';
import { useUserFactory } from '@vue-storefront/core';

const { useUser, setUser } = useUserFactory<Customer, any, any>(params);

export { useUser, setUser };
