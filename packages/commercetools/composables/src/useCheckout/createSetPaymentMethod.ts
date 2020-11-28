/* eslint-disable @typescript-eslint/no-unused-vars */

const createSetPaymentMethod = ({ chosenPaymentMethod }) => async (method, options: any = {}) => {
  chosenPaymentMethod.value = method;
};

export default createSetPaymentMethod;
