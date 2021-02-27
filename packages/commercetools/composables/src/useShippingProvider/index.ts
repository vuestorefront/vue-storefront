import { useShippingProviderFactory, UseShippingProviderParams, Context } from '@vue-storefront/core';
import useCart from '../useCart';
import { ShippingMethod } from './../types/GraphQL';

const params: UseShippingProviderParams<ShippingMethod> = {
  provide() {
    return {
      cart: useCart()
    };
  },
  load: async (context: Context, { customQuery }) => {
    if (!context.cart.cart?.value?.shippingInfo) {
      await context.cart.load({ customQuery });
    }
    return context.cart.cart.value.shippingInfo;
  }
};

export default useShippingProviderFactory<ShippingMethod>(params);
