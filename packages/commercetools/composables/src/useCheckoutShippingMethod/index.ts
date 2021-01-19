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
    const shippingMethodsResponse = await context.$ct.api.getShippingMethods(context.cart.cart.value.id);
    return shippingMethodsResponse.shippingMethods;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  save: async (context: Context, params) => {
    const cartResponse = await context.$ct.api.updateCart({
      id: context.cart.cart.value.id,
      version: context.cart.cart.value.version,
      actions: [
        cartActions.setShippingMethodAction(params.method.id)
      ]
    });

    context.cart.setCart(cartResponse.data.cart);
    return cartResponse;
  }
};

export default useCheckoutShippingFactory<any, any>(params);
