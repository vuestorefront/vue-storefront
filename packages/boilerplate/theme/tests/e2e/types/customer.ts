import { Address } from './address';

export type Customer = {
  firstName?: string;
  lastName?: string;
  address?: {
    shipping: Address,
    billing: Address
  }
}
