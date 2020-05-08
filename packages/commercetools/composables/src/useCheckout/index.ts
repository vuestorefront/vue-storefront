/* istanbul ignore file */
import { useSSR } from '@vue-storefront/core';
import createSetShippingDetails from './createSetShippingDetails';
import createSetBillingDetails from './createSetBillingDetails';
import createSetShippingMethod from './createSetShippingMethod';
import createLoadShippingMethods from './createLoadShippingMethods';
import createLoadPaymentMethods from './createLoadPaymentMethods';
import createSetPersonalDetails from './createSetPersonalDetails';
import createSetPaymentMethod from './createSetPaymentMethod';
import createPlaceOrder from './createPlaceOrder';
import createLoadDetails from './createLoadDetails';
import { checkoutComputed } from './shared';
import initFields from './initFields';

// TODO: Move to core
const useCheckoutFactory = (factoryParams) => {
  let isInitialized = false;

  const useCheckout = () => {
    const { initialState, saveToInitialState } = useSSR('vsf-cart');
    const methodsParams = { factoryParams, saveToInitialState };
    const setShippingMethod = createSetShippingMethod(methodsParams);
    const setShippingDetails = createSetShippingDetails(methodsParams);
    const setBillingDetails = createSetBillingDetails(methodsParams);
    const loadShippingMethods = createLoadShippingMethods({ ...methodsParams, setShippingMethod });
    const loadPaymentMethods = createLoadPaymentMethods(methodsParams);
    const loadDetails = createLoadDetails(methodsParams);
    const setPersonalDetails = createSetPersonalDetails({ ...methodsParams, setShippingDetails });
    const setPaymentMethod = createSetPaymentMethod(methodsParams);
    const placeOrder = createPlaceOrder(methodsParams);

    if (!isInitialized) {
      initFields(initialState);
    }

    isInitialized = true;

    return {
      ...checkoutComputed,
      setShippingDetails,
      setBillingDetails,
      loadShippingMethods,
      loadPaymentMethods,
      setShippingMethod,
      setPersonalDetails,
      setPaymentMethod,
      placeOrder,
      loadDetails
    };
  };

  return useCheckout;
};

export default useCheckoutFactory({});
