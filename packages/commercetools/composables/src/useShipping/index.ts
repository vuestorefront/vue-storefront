import { useShippingFactory, UseShippingParams, Context } from '@vue-storefront/core';
import useCart from '../useCart';
import { cartActions } from '@vue-storefront/commercetools-api';
import { Address } from './../types/GraphQL';

const params: UseShippingParams<Address, {}> = {
  provide() {
    return {
      cart: useCart()
    };
  },
  load: async (context: Context) => {
    if (!context.cart.cart?.value?.shippingAddress) {
      await context.cart.load();
    }
    return context.cart.cart.value.shippingAddress;
  },
  save: async (context: Context, { shippingDetails }) => {
    const cartResponse = await context.$ct.api.updateCart({
      id: context.cart.cart.value.id,
      version: context.cart.cart.value.version,
      actions: [
        cartActions.setShippingMethodAction(),
        cartActions.setShippingAddressAction(shippingDetails)
      ]
    });

    context.cart.setCart(cartResponse.data.cart);
    return context.cart.cart.value.shippingAddress;
  }
};

export default useShippingFactory<Address, {}>(params);
