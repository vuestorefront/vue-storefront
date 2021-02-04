import { ShippingGetters } from '@vue-storefront/core';
import { Address } from './../types/GraphQL';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getAddress = (shipping: any, criteria?: Record<string, any>) => shipping;

export const getAddressPostCode = (address: Address) => address?.postalCode;
export const getAddressStreetName = (address: Address) => address?.streetName;
export const getAddressStreetNumber = (address: Address) => address?.streetNumber;
export const getAddressCity = (address: Address) => address?.city;
export const getAddressFirstName = (address: Address) => address?.firstName;
export const getAddressLastName = (address: Address) => address?.lastName;
export const getAddressCountry = (address: Address) => address?.country;
export const getAddressPhone = (address: Address) => address?.phone;
export const getAddressEmail = (address: Address) => address?.email;
export const getAddressProvince = (address: Address) => address?.state;
export const getAddressCompanyName = (address: Address) => address?.company;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getAddressTaxNumber = (address: Address) => '';
export const getAddressApartmentNumber = (address: Address) => address?.apartment;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const isAddressDefault = (address: Address) => false;

const shippingGetters: ShippingGetters<any, Address> = {
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
