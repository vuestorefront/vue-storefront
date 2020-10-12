/* istanbul ignore file */

import { UseCheckout } from '@vue-storefront/core';
import { ref, Ref, computed } from '@vue/composition-api';
import { User, ShippingMethod, UserAddress } from '../../types';

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

const SHIPPING_METHODS = [
  {
    id: '1',
    price: '0',
    description: 'Delivery from 3 to 7 business days',
    name: 'Pickup in the store'
  },
  {
    id: '2',
    price: '9.90',
    description: 'Delivery from 4 to 6 business days',
    name: 'Delivery to home'
  },
  {
    id: '3',
    price: '9.90',
    description: 'Delivery from 4 to 6 business days',
    name: 'Paczkomaty InPost'
  },
  {
    id: '4',
    price: '11.00',
    description: 'Delivery within 48 hours',
    name: '48 hours'
  },
  {
    id: '5',
    price: '14.00',
    description: 'Delivery within 24 hours',
    name: 'Urgent 24h'
  }
];

const paymentMethods: Ref<any[]> = ref(PAYMENT_METHODS_MOCK);
const shippingMethods: Ref<any[]> = ref(SHIPPING_METHODS);
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
