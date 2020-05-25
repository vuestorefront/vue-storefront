import {
  addToCart as apiAddToCart,
  removeFromCart as apiRemoveFromCart,
  updateCartQuantity as apiUpdateCartQuantity,
  applyCartCoupon as apiApplyCartCoupon
} from '@vue-storefront/commercetools-api';
import { ProductVariant, Cart, LineItem } from './../types/GraphQL';
import loadCurrentCart from './currentCart';
import { useCartFactory, UseCartFactoryParams} from '@vue-storefront/core';

const params: UseCartFactoryParams<Cart, LineItem, ProductVariant, any> = {
  loadCart: async () => {
    return await loadCurrentCart();
  },
  addToCart: async ({ currentCart, product, quantity }) => {
    const updatedCart = await apiAddToCart(currentCart, product, quantity);
    return updatedCart.data.cart;
  },
  removeFromCart: async ({ currentCart, product }) => {
    const updateResponse = await apiRemoveFromCart(currentCart, product);
    return updateResponse.data.cart;
  },
  updateQuantity: async ({ currentCart, product, quantity }) => {
    const updatedCart = await apiUpdateCartQuantity(
      currentCart, { ...product, quantity }
    );
    return updatedCart.data.cart;
  },
  clearCart: async ({ currentCart }) => {
    return currentCart;
  },
  applyCoupon: async ({ currentCart, coupon }) => {
    const updatedCart = await apiApplyCartCoupon(currentCart, coupon);
    return { updatedCart: updatedCart.data.cart, updatedCoupon: coupon };
  },
  removeCoupon: async ({ currentCart }) => {
    return { updatedCart: currentCart, updatedCoupon: null };
  },
  isOnCart: ({ currentCart }) => {
    console.log('Mocked isOnCart', currentCart);
    return true;
  }
};

const { useCart, setCart } = useCartFactory<Cart, LineItem, ProductVariant, any>(params);

export { useCart, setCart };
