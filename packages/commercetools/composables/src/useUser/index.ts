import { UseUser } from '@vue-storefront/core';
import {
  Customer
} from '@vue-storefront/commercetools-api/lib//types/GraphQL';

import { params } from './factoryParams';
import { useUserFactory } from '@vue-storefront/core';

const useUser: () => UseUser<Customer, any> = useUserFactory<Customer, any, any>(params);

export default useUser;
