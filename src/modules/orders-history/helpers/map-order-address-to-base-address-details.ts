import BaseAddressDetails from '@vue-storefront/core/modules/checkout/types/BaseAddressDetails';
import isAddressesEquals from '@vue-storefront/core/modules/checkout/helpers/is-addresses-equals.function';

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

function normalizeComparableTextValue (value?: string): string {
  return (value || '').trim().replace(/\s+/g, ' ');
}

function normalizeComparableStreetAddress (address: BaseAddressDetails): string {
  return [address.streetAddress, address.apartmentNumber]
    .map(normalizeComparableTextValue)
    .filter(Boolean)
    .join(', ');
}

export function normalizeBaseAddressDetailsForComparison (address: BaseAddressDetails): BaseAddressDetails {
  const normalizedRegionId = typeof address.region_id === 'number' ? address.region_id : null;

  return {
    firstName: normalizeComparableTextValue(address.firstName),
    lastName: normalizeComparableTextValue(address.lastName),
    country: normalizeComparableTextValue(address.country),
    streetAddress: normalizeComparableStreetAddress(address),
    apartmentNumber: '',
    city: normalizeComparableTextValue(address.city),
    state: normalizedRegionId !== null ? '' : normalizeComparableTextValue(address.state),
    region_id: normalizedRegionId,
    zipCode: normalizeComparableTextValue(address.zipCode),
    phoneNumber: normalizeComparableTextValue(address.phoneNumber),
    vat_id: normalizeComparableTextValue(address.vat_id)
  };
}

export function mapOrderAddressToComparableBaseAddressDetails (orderAddress: OrderAddress): BaseAddressDetails {
  return normalizeBaseAddressDetailsForComparison(mapOrderAddressToBaseAddressDetails(orderAddress));
}

export function isOrderAddressConfirmationSubmission (
  orderAddress: OrderAddress,
  address: BaseAddressDetails
): boolean {
  return isAddressesEquals(
    mapOrderAddressToComparableBaseAddressDetails(orderAddress),
    normalizeBaseAddressDetailsForComparison(address)
  );
}
