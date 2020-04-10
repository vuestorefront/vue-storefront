/* istanbul ignore file */

import { UseUser } from '@vue-storefront/interfaces';
import { BapiUser } from '../../types';

import { params } from './factoryParams';
import { useUserFactory } from '@vue-storefront/factories';

// @todo useUser

const useUser: () => UseUser<BapiUser, any> = useUserFactory<BapiUser, any, any>(params);

export default useUser;
