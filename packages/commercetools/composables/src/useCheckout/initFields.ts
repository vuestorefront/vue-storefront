import {
  personalDetails,
  shippingDetails,
  billingDetails,
  initialDetails,
  isShippingAddressCompleted,
  isBillingAddressCompleted,
  chosenShippingMethod
} from './shared';

const initFields = (cart) => {
  personalDetails.value.email = cart.customerEmail;
  shippingDetails.value = { ...initialDetails, ...shippingDetails.value, ...cart.shippingAddress };
  billingDetails.value = cart.billingAddress || initialDetails;
  isShippingAddressCompleted.value = Boolean(cart.shippingAddress);
  isBillingAddressCompleted.value = Boolean(cart.billingAddress);
  chosenShippingMethod.value = cart.shippingInfo?.shippingMethod || {};
};

export default initFields;
