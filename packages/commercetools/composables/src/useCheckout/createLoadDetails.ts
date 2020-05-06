/* eslint-disable @typescript-eslint/no-unused-vars */
import { cart } from './../useCart';
import { personalDetails } from './shared';

const createLoadDetails = (factoryParams) => async () => {
  personalDetails.value.email = cart.value.customerEmail;
};

export default createLoadDetails;
