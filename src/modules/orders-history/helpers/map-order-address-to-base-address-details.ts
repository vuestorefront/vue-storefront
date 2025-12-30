import BaseAddressDetails from '@vue-storefront/core/modules/checkout/types/BaseAddressDetails';

import { OrderAddress } from '../types/order-address';

export function mapOrderAddressToBaseAddressDetails (orderAddress: OrderAddress): BaseAddressDetails {
  return {
    firstName: orderAddress.firstname,
    lastName: orderAddress.lastname,
    country: orderAddress.country_id,
    streetAddress: orderAddress.street.join(', '),
    apartmentNumber: '',
    city: orderAddress.city,
    state: orderAddress.region || '',
    region_id: orderAddress.region_id || null,
    zipCode: orderAddress.postcode,
    phoneNumber: orderAddress.telephone || '',
    vat_id: orderAddress.vat_id || ''
  };
}
