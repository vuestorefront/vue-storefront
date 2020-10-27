import { UserShippingGetters } from '@vue-storefront/core';

const userGetters: UserShippingGetters<any, any> = {
  getAddresses: (shipping, criteria?: Record<string, any>) => {
    const { addresses } = shipping;
    if (!criteria || !Object.keys(criteria).length) {
      return addresses;
    }
    const entries = Object.entries(criteria);
    return shipping.addresses.filter(
      address => entries.every(([key, value]) => address[key] === value)
    );
  },
  getDefault: shipping => shipping.addresses.find(address => address.isDefault),
  getTotal: shipping => shipping.addresses.length,
  getPostCode: address => address ? address.zipCode : '',
  getStreetName: address => address ? address.streetName : '',
  getStreetNumber: address => address ? address.streetNumber : '',
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
