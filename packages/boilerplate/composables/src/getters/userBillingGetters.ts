import { UserBillingGetters } from '@vue-storefront/core';
import type {
  UserBillingAddress as Address,
  UserBillingAddressItem as AddressItem,
  UserBillingAddressSearchCriteria
} from '@vue-storefront/boilerplate-api';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getAddresses(billing: Address, criteria?: UserBillingAddressSearchCriteria): AddressItem[] {
  return [];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getDefault(billing: Address): Address {
  return {};
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getTotal(billing: Address): number {
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

export const userBillingGetters: UserBillingGetters<Address, AddressItem> = {
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
