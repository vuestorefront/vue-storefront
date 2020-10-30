/* istanbul ignore file */

import { UserGetters} from '@vue-storefront/core';
import { User } from '../../types';

export const getUserFirstName = (user: User): string => user?.firstName || '';

export const getUserLastName = (user: User): string => user?.lastName || '';

export const getUserFullName = (user: User): string => user ? `${user.firstName} ${user.lastName}` : '';

export const getUserEmailAddress = (user: User): string => user?.email || '';

const userGetters: UserGetters<User> = {
  getFirstName: getUserFirstName,
  getLastName: getUserLastName,
  getFullName: getUserFullName,
  getEmailAddress: getUserEmailAddress
};

export default userGetters;
