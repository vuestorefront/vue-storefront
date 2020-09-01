/* istanbul ignore file */

import { useCartFactory, UseCartFactoryParams } from '@vue-storefront/core';
import { ref, Ref } from '@vue/composition-api';
import { Cart, CartItem, Coupon, Product } from '../../types';

export const cart: Ref<Cart> = ref({
  items: []
});

// @todo: implement cart

const params: UseCartFactoryParams<Cart, CartItem, Product, Coupon> = {
  loadCart: async () => {
    return cart.value;
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addToCart: async ({ currentCart, product, quantity }) => {
    let existingCartItem: CartItem = cart.value.items.find((item) => {
      if (item.id === product.id) return item;
    });
    if (existingCartItem) {
      existingCartItem.qty += quantity;
    } else {
      existingCartItem = {
        description: product.longDescription,
        id: product.id,
        price: { current: product.price, original: product.priceMax },
        primaryCategoryId: product.primaryCategoryId,
        qty: quantity,
        name: product.name,
        image: product.images[0].link,
        attributes: {}
      };
      cart.value.items.push(existingCartItem);
    }
    return cart.value;
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  removeFromCart: async ({ currentCart, product }) => {
    cart.value.items = cart.value.items .filter(p => p.id !== product.id);
    return cart.value;
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateQuantity: async ({ currentCart, product, quantity }) => {
    const existingCartItem: CartItem = cart.value.items.find((item) => {
      if (item.id === product.id) return item;
    });
    existingCartItem.qty = quantity;
    return cart.value;
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  clearCart: async ({ currentCart }) => {
    cart.value.items = [];
    return cart.value;
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  applyCoupon: async ({ currentCart, coupon }) => {
    console.log('Mocked: applyCoupon');
    return {updatedCart: cart.value, updatedCoupon: coupon };
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  removeCoupon: async ({ currentCart, coupon }) => {
    console.log('Mocked: removeCoupon');
    return {updatedCart: cart.value };
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isOnCart: ({ currentCart }) => {
    console.log('Mocked: isOnCart');
    return false;
  }
};

const { setCart, useCart } = useCartFactory<Cart, CartItem, Product, Coupon>(params);

export { setCart, useCart };
