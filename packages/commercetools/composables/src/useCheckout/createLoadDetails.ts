/* eslint-disable @typescript-eslint/no-unused-vars */
import initFields from './initFields';
import { CustomQuery } from '@vue-storefront/core';
import { params } from 'src/useUser/factoryParams';

const createLoadDetails = (params, customQuery?: CustomQuery) => async () => {
  const { cartFields } = params;
  await cartFields.loadCart(customQuery);
  initFields(cartFields.cart.value, params);
};

export default createLoadDetails;
