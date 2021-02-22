import { useVSFContext, UseCart, AgnosticCoupon } from '@vue-storefront/core';
import { cartActions } from '@vue-storefront/commercetools-api';
import { ref, computed } from '@vue/composition-api';
import { ProductVariant, Cart, LineItem } from '@vue-storefront/commercetools/src/types/GraphQL';

export default (cartComposable: UseCart<Cart, LineItem, ProductVariant, AgnosticCoupon>) => {
  const { $ct } = useVSFContext();
  const error = ref({
    load: null,
    save: null
  });

  const load = async () => {
    try {
      error.value.load = null;
      const shippingMethodsResponse = await $ct.api.getShippingMethods(cartComposable.cart.value.id);
      return (shippingMethodsResponse as any).data;
    } catch (err) {
      error.value.load = err;
    }
  };

  const save = async ({ shippingMethod }) => {
    try {
      error.value.save = null;
      const cartResponse = await $ct.api.updateCart({
        id: cartComposable.cart.value.id,
        version: cartComposable.cart.value.version,
        actions: [
          cartActions.setShippingMethodAction(shippingMethod.id)
        ]
      });

      cartComposable.setCart(cartResponse.data.cart);
      return cartResponse.data.cart.shippingInfo.shippingMethod;
    } catch (err) {
      error.value.save = err;
    }
  };

  return {
    load,
    save,
    error: computed(() => error.value)
  };
};
