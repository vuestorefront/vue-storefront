import { useVSFContext, UseCart } from '@vue-storefront/core';
import { cartActions } from '@vue-storefront/commercetools-api';

export default (cartComposable: UseCart<any, any, any, any>) => {
  const { $ct } = useVSFContext();
  console.log(cartComposable, 'hmm');
  const load = async () => {
    const shippingMethodsResponse = await $ct.api.getShippingMethods(cartComposable.cart.value.id);
    return (shippingMethodsResponse as any).data;
  };

  const save = async ({ shippingMethod }) => {
    const cartResponse = await $ct.api.updateCart({
      id: cartComposable.cart.value.id,
      version: cartComposable.cart.value.version,
      actions: [
        cartActions.setShippingMethodAction(shippingMethod.id)
      ]
    });

    cartComposable.setCart(cartResponse.data.cart);
    return cartResponse.data.cart.shippingInfo.shippingMethod;
  };

  return {
    load,
    save
  };
};
