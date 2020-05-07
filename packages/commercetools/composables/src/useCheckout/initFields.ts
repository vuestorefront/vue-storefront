import {
  personalDetails,
  shippingDetails,
  billingDetails,
  initialDetails,
  isShippingAddressCompleted,
  isBillingAddressCompleted,
  isPersonalDetailsCompleted,
  chosenShippingMethod
} from './shared';

const initFields = (cart) => {
  personalDetails.value.email = cart.customerEmail;
  shippingDetails.value = { ...initialDetails, ...shippingDetails.value, ...cart.shippingAddress };
  billingDetails.value = cart.billingAddress || initialDetails;
  isShippingAddressCompleted.value = Boolean(cart.shippingAddress);
  isBillingAddressCompleted.value = Boolean(cart.billingAddress);
  isPersonalDetailsCompleted.value = Boolean(cart.customerEmail);
  chosenShippingMethod.value = cart.shippingInfo?.shippingMethod || {};
};

export default initFields;
