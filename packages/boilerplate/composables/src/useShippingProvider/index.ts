import { useShippingProviderFactory, UseShippingProviderParams, Context } from '@vue-storefront/core';
import { ShippingMethod } from '../types';

const params: UseShippingProviderParams<ShippingMethod> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  load: async (context: Context, { customQuery }) => {
    console.log('Mocked: loadShippingProvider');

    return null;
  }
};

export default useShippingProviderFactory<ShippingMethod>(params);
