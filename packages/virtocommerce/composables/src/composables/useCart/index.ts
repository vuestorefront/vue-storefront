/* istanbul ignore file */

import { useCartFactory, UseCartFactoryParams } from '@vue-storefront/core';
import { ref, Ref } from '@vue/composition-api';
import { Cart, CartItem, Coupon, Product } from '../../types';

export const cart: Ref<Cart> = ref(null);

// @todo: implement cart

const params: UseCartFactoryParams<Cart, CartItem, Product, Coupon> = {
  loadCart: async () => {
    console.log('Mocked: loadCart');
    return {};
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addToCart: async ({ currentCart, product, quantity }) => {
    console.log('Mocked: addToCart');
    return {};
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  removeFromCart: async ({ currentCart, product }) => {
    console.log('Mocked: removeFromCart');
    return {};
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateQuantity: async ({ currentCart, product, quantity }) => {
    console.log('Mocked: updateQuantity');
    return {};
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  clearCart: async ({ currentCart }) => {
    console.log('Mocked: clearCart');
    return {};
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  applyCoupon: async ({ currentCart, couponCode }) => {
    console.log('Mocked: applyCoupon');
    return {updatedCart: {}, updatedCoupon: {}};
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  removeCoupon: async ({ currentCart, coupon }) => {
    console.log('Mocked: removeCoupon');
    return {updatedCart: {}};
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isOnCart: ({ currentCart }) => {
    console.log('Mocked: isOnCart');
    return false;
  }
};

const { setCart, useCart } = useCartFactory<Cart, CartItem, Product, Coupon>(params);

export { setCart, useCart };
