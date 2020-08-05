import { track } from '@vue-storefront/core';

import useLocale from './useLocale';
import { setUser, useUser } from './useUser';
import { userGetters } from './getters';

track('VSFVirtoCommerce');

export {
  useLocale,
  useUser,
  setUser,
  userGetters
};
