/* eslint-disable @typescript-eslint/no-unused-vars */

import { updateCart, cartActions } from '@vue-storefront/commercetools-api';
import { cart } from './../useCart';
import { personalDetails } from './shared';
import initFields from './initFields';

const createSetPersonalDetails = (factoryParams: any, { setShippingDetails }) => async (data, options: any = {}) => {
  personalDetails.value = { ...personalDetails.value, ...data };
  const { firstName, lastName } = personalDetails.value;

  if (options.save) {
    const cartResponse = await updateCart({
      id: cart.value.id,
      version: cart.value.version,
      actions: [
        cartActions.setCustomerEmail(personalDetails.value.email)
      ]
    });

    cart.value = cartResponse.data.cart;
    initFields(cart.value);
    setShippingDetails({ firstName, lastName });
  }
};

export default createSetPersonalDetails;
