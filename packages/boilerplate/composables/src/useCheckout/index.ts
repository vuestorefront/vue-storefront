/* istanbul ignore file */

import { UseCheckout } from '@vue-storefront/core';
import { ref, Ref, computed } from '@vue/composition-api';
import { User, ShippingMethod, UserAddress } from '../types';

const PAYMENT_METHODS_MOCK = [
  {
    label: 'Visa Debit',
    value: 'debit'
  },
  {
    label: 'MasterCard',
    value: 'mastercard'
  },
  {
    label: 'Visa Electron',
    value: 'electron'
  },
  {
    label: 'Cash on delivery',
    value: 'cash'
  },
  {
    label: 'Check',
    value: 'check'
  }
];

const paymentMethods: Ref<any[]> = ref(PAYMENT_METHODS_MOCK);
const shippingMethods: Ref<any[]> = ref([]);
const personalDetails: Ref<User> = ref({});
const shippingDetails: Ref<UserAddress> = ref({});
const billingDetails: Ref<UserAddress> = ref({});
const chosenPaymentMethod: Ref<string> = ref('');
const chosenShippingMethod: Ref<ShippingMethod> = ref({});
const placeOrder = async () => {};

// @todo CHECKOUT
const useCheckout: () => UseCheckout<any, any, any, any, any, any, any, any> = () => {
  return {
    paymentMethods,
    shippingMethods,
    personalDetails,
    shippingDetails,
    billingDetails,
    chosenPaymentMethod,
    chosenShippingMethod,
    placeOrder,
    loading: computed(() => false)
  };
};

export default useCheckout;
