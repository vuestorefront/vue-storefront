/* eslint-disable @typescript-eslint/no-unused-vars */

import { cartActions } from '@vue-storefront/commercetools-api';
import initFields from './initFields';
import { CustomQuery } from '@vue-storefront/core';

const createSetPersonalDetails = (params) => async (data, options: any = {}, customQuery?: CustomQuery) => {
  const { context, personalDetails, loading, setShippingDetails, cartFields, setCart } = params;
  personalDetails.value = { ...personalDetails.value, ...data };
  const { firstName, lastName } = personalDetails.value;

  if (!options.save) return;
  loading.value.personalDetails = true;

  try {
    const cartResponse = await context.$ct.api.updateCart({
      id: cartFields.cart.value.id,
      version: cartFields.cart.value.version,
      actions: [
        cartActions.setCustomerEmail(personalDetails.value.email)
      ]
    }, customQuery);

    setCart(cartResponse.data.cart);
    initFields(cartResponse.data.cart, params);
    setShippingDetails({ firstName, lastName });
  } finally {
    loading.value.personalDetails = false;
  }
};

export default createSetPersonalDetails;
