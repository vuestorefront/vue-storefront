import { useShippingFactory, UseShippingParams, Context } from '@vue-storefront/core';
import { useCart } from '../useCart';
import { cartActions } from '@vue-storefront/commercetools-api';
import { Address } from './../types/GraphQL';

type ShippingParams = {
  resetShippingMethods: boolean;
  [x:string]: any
}

const useShippingFactoryParams: UseShippingParams<Address, ShippingParams> = {
  provide() {
    return {
      cart: useCart()
    };
  },
  load: async (context: Context, { customQuery }) => {
    if (!context.cart.cart?.value?.shippingAddress) {
      await context.cart.load({ customQuery });
    }
    return context.cart.cart.value.shippingAddress;
  },
  save: async (context: Context, { shippingDetails, customQuery, params = { resetShippingMethods: true } }) => {
    const cartResponse = await context.$ct.api.updateCart({
      id: context.cart.cart.value.id,
      version: context.cart.cart.value.version,
      actions: [
        ...(params.resetShippingMethods ? [cartActions.setShippingMethodAction()] : []),
        cartActions.setShippingAddressAction(shippingDetails)
      ]
    }, customQuery);

    context.cart.setCart(cartResponse.data.cart);
    return context.cart.cart.value.shippingAddress;
  }
};

const useShipping = useShippingFactory<Address, ShippingParams>(useShippingFactoryParams);

export {
  useShipping,
  useShippingFactoryParams
};
