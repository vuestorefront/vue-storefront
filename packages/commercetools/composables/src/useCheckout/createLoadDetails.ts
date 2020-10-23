/* eslint-disable @typescript-eslint/no-unused-vars */
import initFields from './initFields';
import { CustomQuery } from '@vue-storefront/core';

const createLoadDetails = ({ factoryParams, cartFields }, customQuery?: CustomQuery) => async () => {
  await cartFields.loadCart(customQuery);
  initFields(cartFields.cart.value);
};

export default createLoadDetails;
