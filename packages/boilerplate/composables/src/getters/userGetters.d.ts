import { UserGetters } from '@vue-storefront/core';
import { User } from '../types';
export declare const getUserFirstName: (user: User) => string;
export declare const getUserLastName: (user: User) => string;
export declare const getUserFullName: (user: User) => string;
export declare const getUserEmailAddress: (user: User) => string;
declare const userGetters: UserGetters<User>;
export default userGetters;
