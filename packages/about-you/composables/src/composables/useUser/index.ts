/* istanbul ignore file */

import { BapiUser } from '../../types';
import { params } from './factoryParams';
import { useUserFactory } from '@vue-storefront/core';

// @todo useUser

const { setUser, useUser } = useUserFactory<BapiUser, any, any>(params);

export { useUser, setUser };
