import { useShippingMethodFactory, UseShippingMethodParams, Context } from '@vue-storefront/core';
import useCart from '../useCart';
import { cartActions, ShippingMethod } from '@vue-storefront/commercetools-api';
import { ShippingMethodData } from '@vue-storefront/commercetools-api/lib/api/getShippingMethods';

const params: UseShippingMethodParams<ShippingMethodData, ShippingMethod, {}> = {
  provide() {
    return {
      cart: useCart()
    };
  },
  load: async (context: Context) => {
    const shippingMethodsResponse = await context.$ct.api.getShippingMethods(context.cart.cart.value.id);
    return (shippingMethodsResponse as any).data;
  },
  save: async (context: Context, { shippingMethod }) => {
    const cartResponse = await context.$ct.api.updateCart({
      id: context.cart.cart.value.id,
      version: context.cart.cart.value.version,
      actions: [
        cartActions.setShippingMethodAction(shippingMethod.id)
      ]
    });

    context.cart.setCart(cartResponse.data.cart);
    return cartResponse.data.cart.shippingInfo.shippingMethod;
  }
};

export default useShippingMethodFactory<ShippingMethodData, ShippingMethod, any>(params);
