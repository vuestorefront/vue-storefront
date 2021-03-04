import { useShippingProviderFactory, UseShippingProviderParams, Context } from '@vue-storefront/core';
import useCart from '../useCart';
import { ShippingInfo, ShippingMethod } from './../types/GraphQL';
import { cartActions } from '@vue-storefront/commercetools-api';

const params: UseShippingProviderParams<ShippingInfo, ShippingMethod> = {
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
  },
  save: async (context: Context, { shippingMethod, customQuery }) => {
    const cartResponse = await context.$ct.api.updateCart({
      id: context.cart.cart.value.id,
      version: context.cart.cart.value.version,
      actions: [
        cartActions.setShippingMethodAction(shippingMethod.id)
      ]
    }, customQuery);
    context.cart.setCart(cartResponse.data.cart);

    return context.cart.cart.value.shippingInfo;
  }
};

export default useShippingProviderFactory<ShippingInfo, ShippingMethod>(params);
