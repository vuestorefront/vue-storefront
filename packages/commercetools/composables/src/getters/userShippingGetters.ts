import { UserShippingGetters } from '@vue-storefront/core';

const userShippingGetters: UserShippingGetters<any, any> = {
  getAddresses: (shipping, criteria?: Record<string, any>) => {
    if (!criteria || !Object.keys(criteria).length) {
      return shipping.addresses;
    }

    const entries = Object.entries(criteria);
    return shipping.addresses.filter(address => entries.every(([key, value]) => address[key] === value));
  },
  getDefault: shipping => shipping.addresses.find(({ isDefault }) => isDefault),
  getTotal: shipping => shipping.addresses.length,

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

export default userShippingGetters;
