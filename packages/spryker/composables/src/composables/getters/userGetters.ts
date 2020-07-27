/* eslint-disable @typescript-eslint/no-unused-vars */
/* istanbul ignore file */

import { UserGetters} from '@vue-storefront/core';
import { User } from '../../types';

export const getUserFirstName = (user: User): string => '';

export const getUserLastName = (user: User): string => '';

export const getUserFullName = (user: User): string =>'';

const userGetters: UserGetters<User> = {
  getFirstName: getUserFirstName,
  getLastName: getUserLastName,
  getFullName: getUserFullName
};

export default userGetters;
