/* eslint-disable @typescript-eslint/no-unused-vars */

import { chosenPaymentMethod } from './shared';

const createSetPaymentMethod = ({ factoryParams }) => async (method, options: any = {}) => {
  chosenPaymentMethod.value = method;
};

export default createSetPaymentMethod;
