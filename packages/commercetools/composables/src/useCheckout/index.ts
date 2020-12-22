/* istanbul ignore file */
import createSetShippingDetails from './createSetShippingDetails';
import createSetBillingDetails from './createSetBillingDetails';
import createSetShippingMethod from './createSetShippingMethod';
import createLoadShippingMethods from './createLoadShippingMethods';
import createLoadPaymentMethods from './createLoadPaymentMethods';
import createSetPersonalDetails from './createSetPersonalDetails';
import createSetPaymentMethod from './createSetPaymentMethod';
import createPlaceOrder from './createPlaceOrder';
import createLoadDetails from './createLoadDetails';
import useCart from './../useCart';
import initFields from './initFields';
import { computed } from '@vue/composition-api';
import { sharedRef, generateContext } from '@vue-storefront/core';

// TODO: Move to core
const useCheckoutFactory = (factoryParams) => {
  const useCheckout = () => {
    const context = generateContext({
      provide() {
        return useCart();
      }
    });
    const cartFields = useCart();
    const initialDetails = { contactInfo: {} };
    const paymentMethods = sharedRef([], 'useCheckout-paymentMethods');
    const shippingMethods = sharedRef([], 'useCheckout-shippingMethods');
    const personalDetails = sharedRef({}, 'useCheckout-personalDetails');
    const chosenPaymentMethod = sharedRef({}, 'useCheckout-chosenPaymentMethod');
    const chosenShippingMethod = sharedRef({}, 'useCheckout-chosenShippingMethod');
    const isPersonalDetailsCompleted = sharedRef(false, 'useCheckout-isPersonalDetailsCompleted');
    const isShippingAddressCompleted = sharedRef(false, 'useCheckout-isShippingAddressCompleted');
    const isBillingAddressCompleted = sharedRef(false, 'useCheckout-isBillingAddressCompleted');
    const billingDetails = sharedRef(initialDetails, 'useCheckout-billingDetails');
    const shippingDetails = sharedRef(initialDetails, 'useCheckout-shippingDetails');
    const loading = sharedRef({
      personalDetails: false,
      paymentMethods: false,
      shippingMethods: false,
      shippingAddress: false,
      billingAddress: false,
      shippingMethod: false,
      order: false
    }, 'useCheckout-loading');

    const methodsParams = {
      initialDetails,
      context,
      factoryParams,
      cartFields,
      setCart: context.setCart,
      paymentMethods,
      shippingMethods,
      personalDetails,
      chosenPaymentMethod,
      chosenShippingMethod,
      isPersonalDetailsCompleted,
      isShippingAddressCompleted,
      isBillingAddressCompleted,
      billingDetails,
      shippingDetails,
      loading
    };

    const setShippingMethod = createSetShippingMethod(methodsParams);
    const setShippingDetails = createSetShippingDetails(methodsParams);
    const setBillingDetails = createSetBillingDetails(methodsParams);
    const loadShippingMethods = createLoadShippingMethods(methodsParams);
    const loadPaymentMethods = createLoadPaymentMethods(methodsParams);
    const loadDetails = createLoadDetails(methodsParams);
    const setPersonalDetails = createSetPersonalDetails({ ...methodsParams, setShippingDetails });
    const setPaymentMethod = createSetPaymentMethod(methodsParams);
    const placeOrder = createPlaceOrder(methodsParams);

    initFields(cartFields.cart.value, methodsParams as any);

    const clean = () => {
      context.setCart(null);
    };

    return {
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
      isShippingMethodCompleted: computed(() => Object.keys(chosenShippingMethod.value).length > 0),
      setShippingDetails,
      setBillingDetails,
      loadShippingMethods,
      loadPaymentMethods,
      setShippingMethod,
      setPersonalDetails,
      setPaymentMethod,
      placeOrder,
      loadDetails,
      clean
    };
  };

  return useCheckout;
};

export default useCheckoutFactory({});
