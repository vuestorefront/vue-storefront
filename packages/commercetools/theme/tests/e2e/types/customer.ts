import { Address } from './address';

export type Customer = {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  address?: {
    shipping: Address,
    billing: Address
  }
}
