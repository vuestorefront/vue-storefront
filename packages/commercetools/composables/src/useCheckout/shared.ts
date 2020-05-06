import { ref, Ref, computed } from '@vue/composition-api';
import { ShippingMethod, Customer } from '@vue-storefront/commercetools-api/lib/types/GraphQL';
import { cart } from './../useCart';

export const initialDetails = { contactInfo: {} };
export const paymentMethods: Ref<any[]> = ref([]);
export const shippingMethods: Ref<any[]> = ref([]);
export const personalDetails: Ref<Customer> = ref({});
export const chosenPaymentMethod: Ref<any> = ref({});
export const chosenShippingMethod: Ref<ShippingMethod> = ref({});

export const checkoutComputed = {
  billingDetails: computed(() => cart.value.billingAddress || initialDetails),
  shippingMethods: computed(() => shippingMethods.value),
  personalDetails: computed(() => personalDetails.value),
  shippingDetails: computed(() => cart.value.shippingAddress || initialDetails),
  chosenShippingMethod: computed(() => chosenShippingMethod.value),
  chosenPaymentMethod: computed(() => chosenPaymentMethod.value),
  paymentMethods: computed(() => paymentMethods.value),
  isShippingAddressCompleted: computed(() => Object.keys(cart.value.shippingAddress).length > 4),
  isShippingMethodCompleted: computed(() => Object.keys(chosenShippingMethod.value).length > 0)
};
