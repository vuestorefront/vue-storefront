import { useBillingFactory, UseBillingParams, Context } from '@vue-storefront/core';
import useCart from '../useCart';
import { cartActions } from '@vue-storefront/commercetools-api';
import { Address } from './../types/GraphQL';

const params: UseBillingParams<Address, {}> = {
  provide() {
    return {
      cart: useCart()
    };
  },
  load: async (context: Context) => {
    if (!context.cart.cart?.value?.billingAddress) {
      await context.cart.load();
    }
    return context.cart.cart.value.billingAddress;
  },
  save: async (context: Context, { billingDetails }) => {
    const cartResponse = await context.$ct.api.updateCart({
      id: context.cart.cart.value.id,
      version: context.cart.cart.value.version,
      actions: [
        cartActions.setShippingMethodAction(),
        cartActions.setShippingAddressAction(billingDetails)
      ]
    });

    context.cart.setCart(cartResponse.data.cart);
    return cartResponse.data.cart.billingAddress;
  }
};

export default useBillingFactory<Address, {}>(params);
