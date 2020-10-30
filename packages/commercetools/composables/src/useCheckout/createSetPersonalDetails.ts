/* eslint-disable @typescript-eslint/no-unused-vars */

import { updateCart, cartActions } from '@vue-storefront/commercetools-api';
import { personalDetails, loading} from './shared';
import initFields from './initFields';
import { CustomQuery } from '@vue-storefront/core';

const createSetPersonalDetails = ({ factoryParams, setShippingDetails, cartFields, setCart }) => async (data, options: any = {}, customQuery?: CustomQuery) => {
  personalDetails.value = { ...personalDetails.value, ...data };
  const { firstName, lastName } = personalDetails.value;

  if (!options.save) return;
  loading.value.personalDetails = true;

  try {
    const cartResponse = await updateCart({
      id: cartFields.cart.value.id,
      version: cartFields.cart.value.version,
      actions: [
        cartActions.setCustomerEmail(personalDetails.value.email)
      ]
    }, customQuery);

    setCart(cartResponse.data.cart);
    initFields(cartResponse.data.cart);
    setShippingDetails({ firstName, lastName });
  } finally {
    loading.value.personalDetails = false;
  }
};

export default createSetPersonalDetails;
