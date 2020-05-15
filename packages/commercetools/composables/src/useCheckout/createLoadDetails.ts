/* eslint-disable @typescript-eslint/no-unused-vars */
import initFields from './initFields';

const createLoadDetails = ({ factoryParams, cartFields }) => async () => {
  await cartFields.loadCart();
  initFields(cartFields.cart.value);
};

export default createLoadDetails;
