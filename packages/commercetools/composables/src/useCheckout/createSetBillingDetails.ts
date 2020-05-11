/* eslint-disable @typescript-eslint/no-unused-vars */

import { updateCart, cartActions } from '@vue-storefront/commercetools-api';
import { cart } from './../useCart';
import { billingDetails, loading } from './shared';
import initFields from './initFields';

const initialDetails = { contactInfo: {} };

const createSetBillingDetails = ({ factoryParams }) => async (data, options: any = {}) => {
  billingDetails.value = { ...initialDetails, ...billingDetails.value, ...data };

  if (!options.save) return;
  loading.value.billingAddress = true;

  const cartResponse = await updateCart({
    id: cart.value.id,
    version: cart.value.version,
    actions: [
      cartActions.setBillingAddressAction(billingDetails.value)
    ]
  });

  cart.value = cartResponse.data.cart;
  initFields(cart.value);
  loading.value.billingAddress = false;
};

export default createSetBillingDetails;
