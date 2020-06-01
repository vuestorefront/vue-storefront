/* eslint-disable @typescript-eslint/no-unused-vars */

import { updateCart, cartActions } from '@vue-storefront/commercetools-api';
import { billingDetails, loading } from './shared';
import initFields from './initFields';

const initialDetails = { contactInfo: {} };

const createSetBillingDetails = ({ factoryParams, cartFields, setCart }) => async (data, options: any = {}) => {
  billingDetails.value = { ...initialDetails, ...billingDetails.value, ...data };

  if (!options.save) return;
  loading.value.billingAddress = true;

  const cartResponse = await updateCart({
    id: cartFields.cart.value.id,
    version: cartFields.cart.value.version,
    actions: [
      cartActions.setBillingAddressAction(billingDetails.value)
    ]
  });

  setCart(cartResponse.data.cart);
  initFields(cartResponse.data.cart);
  loading.value.billingAddress = false;
};

export default createSetBillingDetails;
