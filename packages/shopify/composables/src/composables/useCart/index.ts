/* istanbul ignore file */

import { useCartFactory, UseCartFactoryParams } from '@vue-storefront/core';
import { ref, Ref } from '@vue/composition-api';
import { addToCart, removeCart, updateCart } from '@vue-storefront/shopify-api';
import { Cart, CartItem, Product } from '@vue-storefront/shopify-api/src/types';
import { Coupon } from '../../types';
import loadCurrentCart from './loadCurrentCart';
import Cookies from 'js-cookie';

export const cart: Ref<Cart> = ref(null);

// @todo: implement cart
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getBasketItemByProduct = ({ currentCart, product }) => {
  return currentCart.lineItems.find(item => item.productId === product._id);
};

const params: UseCartFactoryParams<Cart, CartItem, Product, Coupon> = {
  loadCart: async () => {
    const cartParams = {
      checkoutId: Cookies.get('cart_id') || '',
      id: Cookies.get('cart_id') || ''
    };
    return await loadCurrentCart(cartParams);
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addToCart: async ({ currentCart, product, quantity }) => {
    let productVariant = product.variants[0];
    if (product && product.selectedVariant) {
      productVariant = product && product.selectedVariant;
    }
    currentCart.lineItems.push(productVariant);
    const cartParams = {
      id: currentCart.id,
      lineItems: [{ variantId: productVariant.id, quantity: quantity }]
    };
    return await addToCart(cartParams);
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  removeFromCart: async ({ currentCart, product }) => {
    const variantId = [];
    variantId.push(product.id);
    const cartParams = {
      id: currentCart.id,
      lineItemIds: variantId
    };
    return await removeCart(cartParams);
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateQuantity: async ({ currentCart, product, quantity }) => {
    const cartParams = {
      id: currentCart.id,
      lineItems: [{ id: product.id, variantId: product.variant.id, quantity: quantity }]
    };
    return await updateCart(cartParams);
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  clearCart: async ({ currentCart }) => {
    return currentCart;
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  applyCoupon: async ({ currentCart, coupon }) => {
    return {updatedCart: currentCart, updatedCoupon: {}};
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  removeCoupon: async ({ currentCart }) => {
    return {updatedCart: currentCart, updatedCoupon: {}};
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isOnCart: ({ currentCart, product }) => {
    return Boolean(getBasketItemByProduct({ currentCart, product }));
  }
};

const {setCart, useCart } = useCartFactory<Cart, CartItem, Product, Coupon>(params);

export { setCart, useCart};
