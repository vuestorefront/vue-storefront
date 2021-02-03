/* istanbul ignore file */

import {
  Context,
  useCartFactory,
  UseCartFactoryParams
} from '@vue-storefront/core';
import { Cart, CartItem, Coupon, Product } from '@vue-storefront/boilerplate-api';

const findItemIndex = (cart: Cart, product: Product) => cart.items.findIndex(({ name }) => name === product.name);

const params: UseCartFactoryParams<Cart, CartItem, Product, Coupon> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  load: async (context: Context, { customQuery }) => {
    return {
      coupons: [],
      items: []
    };
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addItem: async (context: Context, { currentCart, product, quantity, customQuery }) => {
    console.log('Mocked: addToCart');

    const itemIndex = findItemIndex(currentCart, product);

    itemIndex > 0
      ? currentCart.items[itemIndex]._count += quantity
      : currentCart.items.push({ ...product, _count: quantity });

    return currentCart;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  removeItem: async (context: Context, { currentCart, product, customQuery }) => {
    console.log('Mocked: removeFromCart');

    return {
      ...currentCart,
      items: currentCart.items.filter(item => item.name !== product.name)
    };
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateItemQty: async (context: Context, { currentCart, product, quantity, customQuery }) => {
    console.log('Mocked: updateQuantity');

    const itemIndex = findItemIndex(currentCart, product);
    currentCart.items[itemIndex]._count = quantity;
    return currentCart;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  clear: async (context: Context, { currentCart }) => {
    console.log('Mocked: clearCart');

    return {
      ...currentCart,
      items: []
    };
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  applyCoupon: async (context: Context, { currentCart, couponCode, customQuery }) => {
    console.log('Mocked: applyCoupon');

    return {
      updatedCart: currentCart,
      updatedCoupon: {}
    };
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  removeCoupon: async (context: Context, { currentCart, coupon, customQuery }) => {
    console.log('Mocked: removeCoupon');

    return {
      updatedCart: currentCart
    };
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isOnCart: (context: Context, { currentCart, product }) => {
    console.log('Mocked: isOnCart');

    return findItemIndex(currentCart, product) >= 0;
  }
};

export default useCartFactory<Cart, CartItem, Product, Coupon>(params);
