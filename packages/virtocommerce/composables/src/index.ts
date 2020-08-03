import { track } from '@vue-storefront/core';

import { setUser, useUser } from './useUser';
import { userGetters } from './getters';

track('VSFVirtoCommerce');

export {
  useUser,
  setUser,
  userGetters
};
