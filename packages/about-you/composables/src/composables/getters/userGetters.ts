/* istanbul ignore file */

import { BapiUser } from '../../types';
import { UserGetters } from '@vue-storefront/core';

export const getUserFirstName = (user: BapiUser): string => user?.firstName || '';

export const getUserLastName = (user: BapiUser): string => user?.lastName || '';

export const getUserFullName = (user: BapiUser): string => user ? `${user.firstName} ${user.lastName}` : '';

export const getUserEmailAddress = (user: BapiUser): string => user?.email || '';

const userGetters: UserGetters<BapiUser> = {
  getFirstName: getUserFirstName,
  getLastName: getUserLastName,
  getFullName: getUserFullName,
  getEmailAddress: getUserEmailAddress
};

export default userGetters;
