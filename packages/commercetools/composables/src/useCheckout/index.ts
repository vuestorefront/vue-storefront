/* istanbul ignore file */
import createSetDetails from './createSetDetails';
import createSetShippingMethod from './createSetShippingMethod';
import createLoadShippingMethods from './createLoadShippingMethods';
import createLoadPaymentMethods from './createLoadPaymentMethods';
import createSetPersonalDetails from './createSetPersonalDetails';
import createSetPaymentMethod from './createSetPaymentMethod';
import createPlaceOrder from './createPlaceOrder';
import createLoadDetails from './createLoadDetails';
import { checkoutComputed } from './shared';

// TODO: Move to core
const useCheckoutFactory = (factoryParams) => {
  const setShippingMethod = createSetShippingMethod(factoryParams);
  const setShippingDetails = createSetDetails(factoryParams, 'shipping');
  const setBillingDetails = createSetDetails(factoryParams, 'billing');
  const loadShippingMethods = createLoadShippingMethods(factoryParams, { setShippingMethod });
  const loadPaymentMethods = createLoadPaymentMethods(factoryParams);
  const loadDetails = createLoadDetails(factoryParams);
  const setPersonalDetails = createSetPersonalDetails(factoryParams, { setShippingDetails });
  const setPaymentMethod = createSetPaymentMethod(factoryParams);
  const placeOrder = createPlaceOrder(factoryParams);

  const useCheckout = () => {
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
