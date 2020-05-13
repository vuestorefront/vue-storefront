/* eslint-disable @typescript-eslint/no-unused-vars */
import { cart } from './../useCart';
import initFields from './initFields';

const createLoadDetails = ({ factoryParams }) => async () => {
  initFields(cart.value);
};

export default createLoadDetails;
