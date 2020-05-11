/* eslint-disable @typescript-eslint/no-unused-vars */

import { updateCart, cartActions } from '@vue-storefront/commercetools-api';
import { cart } from './../useCart';
import { personalDetails, loading} from './shared';
import initFields from './initFields';

const createSetPersonalDetails = ({ factoryParams, setShippingDetails }) => async (data, options: any = {}) => {
  personalDetails.value = { ...personalDetails.value, ...data };
  const { firstName, lastName } = personalDetails.value;

  if (!options.save) return;
  loading.value.personalDetails = true;

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
  loading.value.personalDetails = false;
};

export default createSetPersonalDetails;
