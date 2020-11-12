/* eslint-disable @typescript-eslint/no-unused-vars */
import initFields from './initFields';
import { CustomQuery } from '@vue-storefront/core';

const createLoadDetails = ({ context, factoryParams, cartFields }, customQuery?: CustomQuery) => async () => {
  await cartFields.loadCart(context, customQuery);
  initFields(cartFields.cart.value);
};

export default createLoadDetails;
