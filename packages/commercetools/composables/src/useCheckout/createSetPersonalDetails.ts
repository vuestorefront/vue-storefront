/* eslint-disable @typescript-eslint/no-unused-vars */

import { updateCart, cartActions } from '@vue-storefront/commercetools-api';
import { personalDetails, loading} from './shared';
import initFields from './initFields';

const createSetPersonalDetails = ({ factoryParams, setShippingDetails, cartFields, setCart }) => async (data, options: any = {}) => {
  personalDetails.value = { ...personalDetails.value, ...data };
  const { firstName, lastName } = personalDetails.value;

  if (!options.save) return;
  loading.value.personalDetails = true;

  const cartResponse = await updateCart({
    id: cartFields.cart.value.id,
    version: cartFields.cart.value.version,
    actions: [
      cartActions.setCustomerEmail(personalDetails.value.email)
    ]
  });

  setCart(cartResponse.data.cart);
  initFields(cartResponse.data.cart);
  setShippingDetails({ firstName, lastName });
  loading.value.personalDetails = false;
};

export default createSetPersonalDetails;
