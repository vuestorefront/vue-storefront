/* eslint-disable @typescript-eslint/no-unused-vars */
import initFields from './initFields';
import { CustomQuery } from '@vue-storefront/core';

const createLoadDetails = (params, customQuery?: CustomQuery) => async () => {
  const { cartFields } = params;
  await cartFields.load(customQuery);
  initFields(cartFields.cart.value, params);
};

export default createLoadDetails;
