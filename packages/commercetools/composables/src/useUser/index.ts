import { UseUser } from '@vue-storefront/interfaces';
import {
  Customer
} from '@vue-storefront/commercetools-api/lib/src/types/GraphQL';

import { params } from './factoryParams';
import { useUserFactory } from '@vue-storefront/factories';

const useUser: () => UseUser<Customer, any> = useUserFactory<Customer, any, any>(params);

export default useUser;
