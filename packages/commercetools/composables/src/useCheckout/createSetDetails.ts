/* eslint-disable @typescript-eslint/no-unused-vars */

import { updateCart, cartActions } from '@vue-storefront/commercetools-api';
import { cart } from './../useCart';
import { billingDetails, shippingDetails } from './shared';
import initFields from './initFields';

const initialDetails = { contactInfo: {} };
const configurations = {
  shipping: { field: shippingDetails, apiAction: 'setShippingAddressAction' },
  billing: { field: billingDetails, apiAction: 'setBillingAddressAction' }
};

const createSetDetails = ({ factoryParams, type }) => {
  const { field, apiAction } = configurations[type];

  return async (data, options: any = {}) => {
    field.value = { ...initialDetails, ...field.value, ...data };

    if (!options.save) return;

    const cartResponse = await updateCart({
      id: cart.value.id,
      version: cart.value.version,
      actions: [
        ...(type === 'shipping' ? [cartActions.setShippingMethodAction()] : []),
        cartActions[apiAction](field.value)
      ]
    });

    cart.value = cartResponse.data.cart;
    initFields(cart.value);
  };
};

export default createSetDetails;
