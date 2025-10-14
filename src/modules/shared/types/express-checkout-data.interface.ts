import ShippingMethod from '@vue-storefront/core/modules/cart/types/ShippingMethod';

export interface MainAddressData {
  country: string,
  city: string,
  state: string,
  region_id: number | null,
  zipCode: string
}

export interface AdditionalAddressData {
  firstName: string,
  lastName: string,
  streetAddress: string,
  phoneNumber?: string
}

export interface ShippingDetailsChangedCallbackData {
  shippingAddress?: MainAddressData,
  paymentAddress?: MainAddressData,
  shippingMethod?: string
}

export interface ExpressCheckoutAuthorizedCallbackData<T> {
  paymentMethod: T,
  customer: {
    firstName: string,
    lastName: string,
    emailAddress: string
  },
  shippingDetails: AdditionalAddressData,
  paymentDetails: AdditionalAddressData
}

export interface ExpressCheckoutUpdateData {
  total: {
    final: number,
    base: number,
    tax: number,
    shipping: number,
    discount: number
  },
  availableShippingMethods: ShippingMethod[],
  selectedShippingMethod: string
}
