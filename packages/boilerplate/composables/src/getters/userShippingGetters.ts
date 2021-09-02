import { UserShippingGetters } from '@vue-storefront/core';
import type {
  UserShippingAddress as Address,
  UserShippingAddressItem as AddressItem,
  UserShippingAddressSearchCriteria
} from '@vue-storefront/boilerplate-api';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getAddresses(shipping: Address, criteria?: UserShippingAddressSearchCriteria): AddressItem[] {
  return [];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getDefault(shipping: Address): Address {
  return {};
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getTotal(shipping: Address): number {
  return 0;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getPostCode(address: AddressItem): string {
  return '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getStreetName(address: AddressItem): string {
  return '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getStreetNumber(address: AddressItem): string | number {
  return '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getCity(address: AddressItem): string {
  return '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getFirstName(address: AddressItem): string {
  return '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getLastName(address: AddressItem): string {
  return '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getCountry(address: AddressItem): string {
  return '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getPhone(address: AddressItem): string {
  return '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getEmail(address: AddressItem): string {
  return '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getProvince(address: AddressItem): string {
  return '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getCompanyName(address: AddressItem): string {
  return '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getTaxNumber(address: AddressItem): string {
  return '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getId(address: AddressItem): string {
  return '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getApartmentNumber(address: AddressItem): string | number {
  return '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function isDefault(address: AddressItem): boolean {
  return false;
}

export const userShippingGetters: UserShippingGetters<Address, AddressItem> = {
  getAddresses,
  getDefault,
  getTotal,
  getPostCode,
  getStreetName,
  getStreetNumber,
  getCity,
  getFirstName,
  getLastName,
  getCountry,
  getPhone,
  getEmail,
  getProvince,
  getCompanyName,
  getTaxNumber,
  getId,
  getApartmentNumber,
  isDefault
};
