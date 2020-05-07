/* eslint-disable @typescript-eslint/no-unused-vars */

import { paymentMethods, chosenPaymentMethod } from './shared';

const PAYMENT_METHODS_MOCK = [
  {
    label: 'Visa Debit',
    value: 'debit',
    reference: {
      id: 'visa-debit'
    }
  },
  {
    label: 'MasterCard',
    value: 'mastercard',
    reference: {
      id: 'mastercard'
    }
  },
  {
    label: 'Visa Electron',
    value: 'electron',
    reference: {
      id: 'electron'
    }
  },
  {
    label: 'Cash on delivery',
    value: 'cash',
    reference: {
      id: 'cash'
    }
  },
  {
    label: 'Check',
    value: 'check',
    reference: {
      id: 'check'
    }
  }
];

const createLoadPaymentMethods = ({ factoryParams }) => async () => {
  paymentMethods.value = PAYMENT_METHODS_MOCK;
  chosenPaymentMethod.value = PAYMENT_METHODS_MOCK[0];
};

export default createLoadPaymentMethods;
