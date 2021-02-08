import { ShippingGetters } from '@vue-storefront/core';
import { Address } from './../types/GraphQL';

export const getAddress = (shipping: Address) => shipping;
export const getAddressPostCode = (address: Address) => address?.postalCode || '';
export const getAddressStreetName = (address: Address) => address?.streetName || '';
export const getAddressStreetNumber = (address: Address) => address?.streetNumber || '';
export const getAddressCity = (address: Address) => address?.city || '';
export const getAddressFirstName = (address: Address) => address?.firstName || '';
export const getAddressLastName = (address: Address) => address?.lastName || '';
export const getAddressCountry = (address: Address) => address?.country || '';
export const getAddressPhone = (address: Address) => address?.phone || '';
export const getAddressEmail = (address: Address) => address?.email || '';
export const getAddressProvince = (address: Address) => address?.state || '';
export const getAddressCompanyName = (address: Address) => address?.company || '';
// Field does not exist in CT. It is available only for customer in cart.customer.vatId
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getAddressTaxNumber = (address: Address) => '';
export const getAddressApartmentNumber = (address: Address) => address?.apartment || '';

const shippingGetters: ShippingGetters<Address, Address> = {
  getAddress,
  getAddressPostCode,
  getAddressStreetName,
  getAddressStreetNumber,
  getAddressCity,
  getAddressFirstName,
  getAddressLastName,
  getAddressCountry,
  getAddressPhone,
  getAddressEmail,
  getAddressProvince,
  getAddressCompanyName,
  getAddressTaxNumber,
  getAddressApartmentNumber
};

export default shippingGetters;
