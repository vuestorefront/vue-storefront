/* istanbul ignore file */

import { UseCart } from '@vue-storefront/core';
import { useCartFactory, UseCartFactoryParams } from '@vue-storefront/core';
import { ref, Ref } from '@vue/composition-api';
import { BapiCart, BapiCartItem, BapiCoupon, BapiProduct } from '../../types';

export const cart: Ref<BapiCart> = ref(null);

// @todo: implement cart

const params: UseCartFactoryParams<BapiCart, BapiCartItem, BapiProduct, BapiCoupon> = {
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

const useCart: () => UseCart<BapiCart, BapiCartItem, BapiProduct, BapiCoupon> = useCartFactory<BapiCart, BapiCartItem, BapiProduct, BapiCoupon>(params);

export default useCart;
