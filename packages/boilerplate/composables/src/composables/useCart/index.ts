/* istanbul ignore file */

import { UseCart, useCartFactory, UseCartFactoryParams } from '@vue-storefront/core';
import { ref, Ref } from '@vue/composition-api';
import { Cart, CartItem, Coupon, Product } from '../../types';

export const cart: Ref<Cart> = ref(null);

// @todo: implement cart

const params: UseCartFactoryParams<Cart, CartItem, Product, Coupon> = {
  cart,
  loadCart: async () => {
    return {};
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addToCart: async ({ currentCart, product, quantity }) => {
    return {};
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  removeFromCart: async ({ currentCart, product }) => {
    return {};
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateQuantity: async ({ currentCart, product, quantity }) => {
    return {};
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  clearCart: async ({ currentCart }) => {
    return {};
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  applyCoupon: async ({ currentCart, coupon }) => {
    return {updatedCart: {}, updatedCoupon: {}};
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  removeCoupon: async ({ currentCart }) => {
    return {updatedCart: {}, updatedCoupon: {}};
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isOnCart: ({ currentCart }) => {
    return false;
  }
};

const useCart: () => UseCart<Cart, CartItem, Product, Coupon> = useCartFactory<Cart, CartItem, Product, Coupon>(params);

export default useCart;
