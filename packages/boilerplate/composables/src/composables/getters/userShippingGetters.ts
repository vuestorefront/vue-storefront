import { UserShippingGetters } from '@vue-storefront/core';

const userGetters: UserShippingGetters<any> = {
  getFiltered: (addresses, criteria: Record<string, any>) => {
    const entries = Object.entries(criteria);
    return addresses.filter(
      address => entries.every(([key, value]) => address[key] === value)
    );
  },
  getDefault: addresses => addresses.find(address => address.isDefault),
  getTotal: addresses => addresses.length,
  getPostCode: address => address ? address.zipCode : '',
  getStreetName: address => address ? address.streetName : '',
  getCity: address => address ? address.city : '',
  getFirstName: address => address ? address.firstName : '',
  getLastName: address => address ? address.lastName : '',
  getCountry: address => address ? address.country : '',
  getStreetNumber: address => address ? address.apartment : '',
  getPhone: address => address ? address.phoneNumber : '',
  getEmail: address => address ? address.email : '',
  getProvince: address => address ? address.state : ''
};

export default userGetters;
