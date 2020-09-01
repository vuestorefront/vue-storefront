/* istanbul ignore file */

import { Ref, computed } from '@vue/composition-api';
import { Customer } from '../types/GraphQL';
import { sharedRef } from '@vue-storefront/core';

export const initialDetails = { contactInfo: {} };
export const paymentMethods: Ref<any[]> = sharedRef([], 'useCheckout-paymentMethods');
export const shippingMethods: Ref<any[]> = sharedRef([], 'useCheckout-shippingMethods');
export const personalDetails: Ref<Customer> = sharedRef({}, 'useCheckout-personalDetails');
export const chosenPaymentMethod: Ref<any> = sharedRef({}, 'useCheckout-chosenPaymentMethod');
export const chosenShippingMethod: Ref<any> = sharedRef({}, 'useCheckout-chosenShippingMethod');
export const isPersonalDetailsCompleted: Ref<boolean> = sharedRef(false, 'useCheckout-isPersonalDetailsCompleted');
export const isShippingAddressCompleted: Ref<boolean> = sharedRef(false, 'useCheckout-isShippingAddressCompleted');
export const isBillingAddressCompleted: Ref<boolean> = sharedRef(false, 'useCheckout-isBillingAddressCompleted');
export const billingDetails: Ref<any> = sharedRef(initialDetails, 'useCheckout-billingDetails');
export const shippingDetails: Ref<any> = sharedRef(initialDetails, 'useCheckout-shippingDetails');
export const loading = sharedRef({
  personalDetails: false,
  paymentMethods: false,
  shippingMethods: false,
  shippingAddress: false,
  billingAddress: false,
  shippingMethod: false,
  order: false
}, 'useCheckout-loading');

export const checkoutComputed = {
  loading: computed(() => loading.value),
  billingDetails: computed(() => billingDetails.value),
  shippingMethods: computed(() => shippingMethods.value),
  personalDetails: computed(() => personalDetails.value),
  shippingDetails: computed(() => shippingDetails.value),
  chosenShippingMethod: computed(() => chosenShippingMethod.value),
  chosenPaymentMethod: computed(() => chosenPaymentMethod.value),
  paymentMethods: computed(() => paymentMethods.value),
  isPersonalDetailsCompleted: computed(() => isPersonalDetailsCompleted.value),
  isShippingAddressCompleted: computed(() => isShippingAddressCompleted.value),
  isBillingAddressCompleted: computed(() => isBillingAddressCompleted.value),
  isShippingMethodCompleted: computed(() => Object.keys(chosenShippingMethod.value).length > 0)
};
