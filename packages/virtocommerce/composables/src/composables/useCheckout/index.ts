/* istanbul ignore file */

import { UseCheckout, sharedRef, Context, generateContext } from '@vue-storefront/core';
import { ref, Ref, computed } from '@vue/composition-api';
import {
  ShippingMethodType,
  PaymentMethodType,
  InputShipmentType,
  InputPaymentType
} from '@vue-storefront/virtocommerce-api';
import { User } from '../../types';
import { useCart } from '../useCart';
import { toUnicode } from 'punycode';

const cartFields: Ref<any> = ref({});
const cartRef: Ref<any> = computed(() => cartFields.value.cart );

const paymentMethods: Ref<PaymentMethodType[]> = ref([]);
const shippingMethods: Ref<ShippingMethodType[]> = ref([]);
const personalDetails: Ref<User> = ref({});
const shippingDetails: Ref<any> = ref({ contactInfo: {} }); 
const billingDetails: Ref<any> = ref({ contactInfo: {} });
const chosenPaymentMethod: Ref<PaymentMethodType> = ref({});
const chosenShippingMethod: Ref<ShippingMethodType> = ref({});

const initialDetails = { contactInfo: {} };

const isPersonalDetailsCompleted: Ref<boolean> = ref(false);
const isShippingAddressCompleted: Ref<boolean> = ref(false);
const isBillingAddressCompleted: Ref<boolean> = ref(false);
const isShippingMethodCompleted: Ref<boolean> = computed(() => Object.keys(chosenShippingMethod.value).length > 0)

const loading = sharedRef({
  personalDetails: false,
  paymentMethods: false,
  shippingMethods: false,
  shippingAddress: false,
  billingAddress: false,
  shippingMethod: false,
  order: false
}, 'useCheckout-loading');

const setPaymentMethod = async (context: Context, paymentMethod, options: any = {}) => {
  chosenPaymentMethod.value = paymentMethod;
     
  if (!options.save) {
    return;
  }

  const inputPayment: InputPaymentType = {
    id: cartRef.value.payments[0]?.id,
    paymentGatewayCode: chosenPaymentMethod.value.code,
    billingAddress: {
      phone: billingDetails.value.contactInfo.phoneNumber,
      line1: billingDetails.value.streetName,
      city: billingDetails.value.city,
      countryCode: billingDetails.value.country,
      countryName: billingDetails.value.country,
      regionName: billingDetails.value.state,
      firstName: billingDetails.value.firstName,
      lastName: billingDetails.value.lastName,
      line2: billingDetails.value.streetNumber,
      postalCode: billingDetails.value.postalCode,
    },
  };
  await context.$vc.api.addOrUpdateCartPayment(context, cartRef.value, inputPayment);
  const cart = await context.$vc.api.getCart(context);
  context.setCart(cart);
};

const setShippingMethod =  async (context: Context, shippingMethod, options: any = {}) => {
  chosenShippingMethod.value = shippingMethod;
     
  if (!options.save) {
    return;
  }

  const inputShipment: InputShipmentType = {
    id: cartRef.value.shipments[0]?.id,
    shipmentMethodCode: chosenShippingMethod.value.code,
    shipmentMethodOption: chosenShippingMethod.value.optionName,
    deliveryAddress: {
      phone: shippingDetails.value.contactInfo.phoneNumber,
      line1: shippingDetails.value.streetName,
      city: shippingDetails.value.city,
      countryCode: shippingDetails.value.country,
      countryName: shippingDetails.value.country,
      regionName: shippingDetails.value.state,
      firstName: shippingDetails.value.firstName,
      lastName: shippingDetails.value.lastName,
      line2: shippingDetails.value.streetNumber,
      postalCode: shippingDetails.value.postalCode,
    },
  };
  await context.$vc.api.addOrUpdateCartShipment(context, cartRef.value, inputShipment);
  const cart = await context.$vc.api.getCart(context);
  context.setCart(cart);
 };

const setShippingDetails = async (data, options: any = {}) => {

  shippingDetails.value = {
    ...shippingDetails.value,
    ...data,
    contactInfo: { ...shippingDetails.value.contactInfo, ...data.contactInfo },
  };
  console.log('setShippingDetails');
  console.log(cartFields.value);

  isShippingAddressCompleted.value = Boolean(true);
};

const setBillingDetails = async (data, options: any = {}) => {

  billingDetails.value = {
    ...billingDetails.value,
    ...data,
    contactInfo: { ...billingDetails.value.contactInfo, ...data.contactInfo },
  };
  console.log('setBillingDetails');
  console.log(cartFields.value);

  isBillingAddressCompleted.value = Boolean(true);
};

const loadShippingMethods = async () => { 
  if (!isShippingAddressCompleted.value) return;
  loading.value.shippingMethods = true;
  try {
    shippingMethods.value = { ...cartRef.value.availableShippingMethods };
  } finally {
    loading.value.shippingMethods = false;
  }
};
const loadPaymentMethods = async () => { 

  console.log('loadPaymentMethods()');
  loading.value.paymentMethods = true;
  try {
    paymentMethods.value = cartRef.value.availablePaymentMethods.map(x=> ({ ...x, label: x.name, value: x.code }));
    console.log(paymentMethods.value);
  } finally {
    loading.value.paymentMethods = false;
  }
};
const loadDetails = async (context: Context) => { };
const setPersonalDetails = async (context: Context) => { };
const clean = async (context: Context) => {
  context.setCart(null);
};

const placeOrder = async (context: Context) => {  
  return await context.$vc.api.placeOrder(context, cartRef.value);
};

// @todo CHECKOUT
const useCheckout: () => UseCheckout<any, any, any, any, any, any, any, any> = () => {

  const context = generateContext({
    setup() {
      return useCart();
    }
  });
  
  cartFields.value = useCart();

  return {
    initialDetails,
    isPersonalDetailsCompleted,
    isShippingAddressCompleted,
    isBillingAddressCompleted,
    isShippingMethodCompleted,
    setShippingMethod,
    setShippingDetails,
    setBillingDetails,
    loadShippingMethods,
    loadPaymentMethods,
    loadDetails,
    setPersonalDetails,
    setPaymentMethod,
    paymentMethods,
    shippingMethods,
    personalDetails,
    shippingDetails,
    billingDetails,
    chosenPaymentMethod,
    chosenShippingMethod,
    placeOrder,
    clean,
    loading : computed(() => loading.value)
  };
};

export default useCheckout;
