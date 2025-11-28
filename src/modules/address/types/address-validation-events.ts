import BaseAddressDetails from '@vue-storefront/core/modules/checkout/types/BaseAddressDetails';

export type AddressSelectedType = 'entered' | 'suggested' | 'modified';

export interface AddressSelectedEvent {
  type: AddressSelectedType,
  address?: Partial<BaseAddressDetails>
}

export const ADDRESS_VALIDATION_EVENTS = {
  ADDRESS_SELECTED: 'address-selected',
  CHANGE_ADDRESS: 'change-address',
  MODAL_HIDE: 'modal-hide'
} as const;

export type AddressValidationEventName = typeof ADDRESS_VALIDATION_EVENTS[keyof typeof ADDRESS_VALIDATION_EVENTS];
