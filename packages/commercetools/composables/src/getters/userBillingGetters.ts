import { UserBillingGetters } from '@vue-storefront/core';

const userGetters: UserBillingGetters<any, any> = {
  getAddresses: (billing, criteria?: Record<string, any>) => {
    const { addresses } = billing;
    if (!criteria || !Object.keys(criteria).length) {
      return addresses;
    }
    const entries = Object.entries(criteria);
    return billing.addresses.filter(
      address => entries.every(([key, value]) => address[key] === value)
    );
  },
  getDefault: billing => billing.addresses.find(address => address.isDefault),
  getTotal: billing => billing.addresses.length,
  getPostCode: address => address ? address.zipCode : '',
  getStreetName: address => address ? address.streetName : '',
  getStreetNumber: address => address ? address.apartment : '',
  getCity: address => address ? address.city : '',
  getFirstName: address => address ? address.firstName : '',
  getLastName: address => address ? address.lastName : '',
  getCountry: address => address ? address.country : '',
  getPhone: address => address ? address.phoneNumber : '',
  getEmail: address => address ? address.email : '',
  getProvince: address => address ? address.state : '',
  getCompanyName: address => address ? address.company : '',
  getTaxNumber: address => address ? address.taxId : '',
  getId: address => address ? address.id : '',
  getApartmentNumber: address => address ? address.apartment : '',
  isDefault: address => address ? address.isDefault : false
};

export default userGetters;
