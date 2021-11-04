import { UserGetters } from '@vue-storefront/core';
import { Customer } from '@vue-storefront/commercetools-api';

export const getUserFirstName = (user: Customer): string => user?.firstName || '';

export const getUserLastName = (user: Customer): string => user?.lastName || '';

export const getUserFullName = (user: Customer): string => user ? `${user.firstName} ${user.lastName}` : '';

export const getUserEmailAddress = (user: Customer): string => user?.email || '';

/**
 * @remarks References:
 * {@link @vue-storefront/commercetools-api#Customer}
 */
const userGetters: UserGetters<Customer> = {
  getFirstName: getUserFirstName,
  getLastName: getUserLastName,
  getFullName: getUserFullName,
  getEmailAddress: getUserEmailAddress
};

export default userGetters;
