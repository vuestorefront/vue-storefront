/* istanbul ignore file */

import { UserGetters} from '@vue-storefront/core';

export const getUserFirstName = (user: any): string => user?.contact?.firstName || '';

export const getUserLastName = (user: any): string => user?.contact?.lastName || '';

export const getUserFullName = (user: any): string => user ? `${user?.contact?.firstName} ${user?.contact?.lastName}` : '';

export const getUserEmailAddress = (user: any): string => user?.email || '';

const userGetters: UserGetters<any> = {
  getFirstName: getUserFirstName,
  getLastName: getUserLastName,
  getFullName: getUserFullName,
  getEmailAddress: getUserEmailAddress
};

export default userGetters;
