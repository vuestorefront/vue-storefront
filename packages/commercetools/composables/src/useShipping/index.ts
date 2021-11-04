import { useShippingFactory, UseShippingParams, Context } from '@vue-storefront/core';
import { cartActions, Address } from '@vue-storefront/commercetools-api';
import { useCart } from '../useCart';

/**
 * @remarks References:
 * {@link @vue-storefront/commercetools-api#Address}
 */
const useShippingFactoryParams: UseShippingParams<Address, any> = {
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
  save: async (context: Context, { shippingDetails, customQuery }) => {
    const cartResponse = await context.$ct.api.updateCart({
      id: context.cart.cart.value.id,
      version: context.cart.cart.value.version,
      actions: [
        cartActions.setShippingMethodAction(),
        cartActions.setShippingAddressAction(shippingDetails)
      ]
    }, customQuery);

    context.cart.setCart(cartResponse.data.cart);
    return context.cart.cart.value.shippingAddress;
  }
};

/**
 * @remarks References:
 * {@link @vue-storefront/commercetools-api#Address}
 */
const useShipping = useShippingFactory<Address, any>(useShippingFactoryParams);

export {
  useShipping,
  useShippingFactoryParams
};
