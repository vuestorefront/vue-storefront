import { useCheckoutShippingFactory, UseCheckoutShippingParams, Context } from '@vue-storefront/core';
import useCart from '../useCart';
import { cartActions } from '@vue-storefront/commercetools-api';

const params: UseCheckoutShippingParams<any, any> = {
  provide() {
    return {
      cart: useCart()
    };
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  load: async (context: Context) => {
    if (!context.cart.cart?.value?.shippingAddress) {
      await context.cart.load();
    }
    return context.cart.cart.value.shippingAddress;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    return cartResponse.data.cart.shippingAddress;
  }
};

export default useCheckoutShippingFactory<any, any>(params);
