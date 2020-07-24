/* istanbul ignore file */

import { ref, Ref, computed } from '@vue/composition-api';
import { Customer } from '@vue-storefront/commercetools-api/lib/types/GraphQL';

export const initialDetails = { contactInfo: {} };
export const paymentMethods: Ref<any[]> = ref([]);
export const shippingMethods: Ref<any[]> = ref([]);
export const personalDetails: Ref<Customer> = ref<Customer>({} as Customer);
export const chosenPaymentMethod: Ref<any> = ref({});
export const chosenShippingMethod: Ref<any> = ref({});
export const isPersonalDetailsCompleted: Ref<boolean> = ref(false);
export const isShippingAddressCompleted: Ref<boolean> = ref(false);
export const isBillingAddressCompleted: Ref<boolean> = ref(false);
export const billingDetails: Ref<any> = ref(initialDetails);
export const shippingDetails: Ref<any> = ref(initialDetails);
export const loading = ref({
  personalDetails: false,
  paymentMethods: false,
  shippingMethods: false,
  shippingAddress: false,
  billingAddress: false,
  shippingMethod: false,
  order: false
});

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
