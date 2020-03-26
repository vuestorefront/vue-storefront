import { UserGetters} from '@vue-storefront/interfaces';
import { Customer } from './../types/GraphQL';

export const getUserFirstName = (user: Customer): string => user ? user.firstName : '';

export const getUserLastName = (user: Customer): string => user ? user.lastName : '';

export const getUserFullName = (user: Customer): string => user ? `${user.firstName} ${user.lastName}` : '';

const userGetters: UserGetters<Customer> = {
  getFirstName: getUserFirstName,
  getLastName: getUserLastName,
  getFullName: getUserFullName
};

export default userGetters;
