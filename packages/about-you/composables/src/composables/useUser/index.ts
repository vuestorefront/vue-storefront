/* istanbul ignore file */

import { UseUser } from '@vue-storefront/core';
import { BapiUser } from '../../types';

import { params } from './factoryParams';
import { useUserFactory } from '@vue-storefront/core';

// @todo useUser

const useUser: () => UseUser<BapiUser, any> = useUserFactory<BapiUser, any, any>(params);

export default useUser;
