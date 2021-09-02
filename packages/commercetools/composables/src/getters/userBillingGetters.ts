import { UserBillingGetters } from '@vue-storefront/core';

const userBillingGetters: UserBillingGetters<any, any> = {
  getAddresses: (billing, criteria?: Record<string, any>) => {
    if (!criteria || !Object.keys(criteria).length) {
      return billing.addresses;
    }

    const entries = Object.entries(criteria);
    return billing.addresses.filter(address => entries.every(([key, value]) => address[key] === value));
  },
  getDefault: billing => billing.addresses.find(({ isDefault }) => isDefault),
  getTotal: billing => billing.addresses.length,

  getPostCode: address => address?.postalCode || '',
  getStreetName: address => address?.streetName || '',
  getStreetNumber: address => address?.streetNumber || '',
  getCity: address => address?.city || '',
  getFirstName: address => address?.firstName || '',
  getLastName: address => address?.lastName || '',
  getCountry: address => address?.country || '',
  getPhone: address => address?.phone || '',
  getEmail: address => address?.email || '',
  getProvince: address => address?.state || '',
  getCompanyName: address => address?.company || '',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getTaxNumber: address => '',
  getId: address => address?.id || '',
  getApartmentNumber: address => address?.apartment || '',
  isDefault: address => address?.isDefault || false
};

export default userBillingGetters;
