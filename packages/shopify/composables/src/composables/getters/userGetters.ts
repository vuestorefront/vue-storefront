/* istanbul ignore file */

import { UserGetters} from '@vue-storefront/core';
import { User } from '../../types';

export const getUserFirstName = (user: User): string => user ? user.firstName : '';

export const getUserLastName = (user: User): string => user ? user.lastName : '';

export const getUserFullName = (user: User): string => user ? `${user.firstName} ${user.lastName}` : '';

const userGetters: UserGetters<User> = {
  getFirstName: getUserFirstName,
  getLastName: getUserLastName,
  getFullName: getUserFullName
};

export default userGetters;
