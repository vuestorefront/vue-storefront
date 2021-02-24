/* istanbul ignore file */

import { UseCheckout } from '@vue-storefront/core';
import { ref, Ref, computed } from '@vue/composition-api';
import { User, ShippingMethod, UserAddress } from '@vue-storefront/boilerplate-api';

const MOCKED_SHIPPING_METHODS = [
  {
    id: '1',
    name: 'Express US',
    description: 'Same day delivery',
    price: 1000
  },
  {
    id: '2',
    name: 'Standard US',
    description: 'Delivery in 5-6 working days',
    price: 300
  }
];

const MOCKED_PAYMENT_METHODS = [
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

const paymentMethods: Ref<any[]> = ref(MOCKED_PAYMENT_METHODS);
const shippingMethods: Ref<any[]> = ref(MOCKED_SHIPPING_METHODS);
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
