/* eslint-disable @typescript-eslint/no-unused-vars */

import { updateCart, cartActions } from '@vue-storefront/commercetools-api';
import { cart } from './../useCart';

const initialDetails = { contactInfo: {} };

const createSetDetails = (factoryParams: any, type: string) => {
  const configurations = {
    shipping: { cartField: 'shippingAddress', apiAction: 'setShippingAddressAction' },
    billing: { cartField: 'billingAddress', apiAction: 'setBillingAddressAction' }
  };

  const { cartField, apiAction } = configurations[type];

  return async (data, options: any = {}) => {
    cart.value[cartField] = { ...initialDetails, ...cart.value[cartField], ...data };

    if (options.save) {
      const cartResponse = await updateCart({
        id: cart.value.id,
        version: cart.value.version,
        actions: [
          cartActions[apiAction](cart.value[cartField])
        ]
      });

      cart.value = cartResponse.data.cart;
    }
  };
};

export default createSetDetails;
