import { Cart } from '../types/GraphQL';

const initFields = (cart: Cart, {
  personalDetails,
  shippingDetails,
  billingDetails,
  initialDetails,
  isShippingAddressCompleted,
  isBillingAddressCompleted,
  isPersonalDetailsCompleted,
  chosenShippingMethod
}) => {
  personalDetails.value.email = cart.customerEmail;
  shippingDetails.value = { ...initialDetails, ...shippingDetails.value, ...cart.shippingAddress };
  billingDetails.value = cart.billingAddress || initialDetails;
  isShippingAddressCompleted.value = Boolean(cart.shippingAddress);
  isBillingAddressCompleted.value = Boolean(cart.billingAddress);
  isPersonalDetailsCompleted.value = Boolean(cart.customerEmail);
  chosenShippingMethod.value = cart.shippingInfo?.shippingMethod || {};
};

export default initFields;
