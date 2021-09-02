import { sharedRef } from '@vue-storefront/core';

export const usePaymentProviderMock = () => {
  const status = sharedRef(false, 'usePaymentProviderMock-status');

  return {
    status
  };
};
