/* istanbul ignore file */

import { Ref, computed } from '@vue/composition-api';
import { Customer } from '@vue-storefront/commercetools-api/lib/types/GraphQL';
import { ssrRef, shared } from '@vue-storefront/core';

export const initialDetails = { contactInfo: {} };
export const paymentMethods: Ref<any[]> = shared(ssrRef([]), 'useCheckout-paymentMethods');
export const shippingMethods: Ref<any[]> = shared(ssrRef([]), 'useCheckout-shippingMethods');
export const personalDetails: Ref<Customer> = shared(ssrRef<Customer>({} as Customer), 'useCheckout-personalDetails');
export const chosenPaymentMethod: Ref<any> = shared(ssrRef({}), 'useCheckout-chosenPaymentMethod');
export const chosenShippingMethod: Ref<any> = shared(ssrRef({}), 'useCheckout-chosenShippingMethod');
export const isPersonalDetailsCompleted: Ref<boolean> = shared(ssrRef(false), 'useCheckout-isPersonalDetailsCompleted');
export const isShippingAddressCompleted: Ref<boolean> = shared(ssrRef(false), 'useCheckout-isShippingAddressCompleted');
export const isBillingAddressCompleted: Ref<boolean> = shared(ssrRef(false), 'useCheckout-isBillingAddressCompleted');
export const billingDetails: Ref<any> = shared(ssrRef(initialDetails), 'useCheckout-billingDetails');
export const shippingDetails: Ref<any> = shared(ssrRef(initialDetails), 'useCheckout-shippingDetails');
export const loading = shared(ssrRef({
  personalDetails: false,
  paymentMethods: false,
  shippingMethods: false,
  shippingAddress: false,
  billingAddress: false,
  shippingMethod: false,
  order: false
}), 'useCheckout-loading');

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
