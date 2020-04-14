/* istanbul ignore file */

import { UserGetters} from '@vue-storefront/core';
import {BapiUser} from '../../types';

export const getUserFirstName = (user: BapiUser): string => user ? user.firstName : '';

export const getUserLastName = (user: BapiUser): string => user ? user.lastName : '';

export const getUserFullName = (user: BapiUser): string => user ? `${user.firstName} ${user.lastName}` : '';

const userGetters: UserGetters<BapiUser> = {
  getFirstName: getUserFirstName,
  getLastName: getUserLastName,
  getFullName: getUserFullName
};

export default userGetters;
