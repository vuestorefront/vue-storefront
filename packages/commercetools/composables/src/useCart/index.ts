import {
  addToCart as apiAddToCart,
  removeFromCart as apiRemoveFromCart,
  updateCartQuantity as apiUpdateCartQuantity,
  applyCartCoupon as apiApplyCartCoupon,
  removeCartCoupon as apiRemoveCartCoupon
} from '@vue-storefront/commercetools-api';
import { ProductVariant, Cart, LineItem } from './../types/GraphQL';
import loadCurrentCart from './currentCart';
import { useCartFactory, UseCartFactoryParams} from '@vue-storefront/core';

const getBasketItemByProduct = ({ currentCart, product }) => {
  return currentCart.lineItems.find(item => item.productId === product._id);
};

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
  removeCoupon: async ({ currentCart, coupon }) => {
    const updatedCart = await apiRemoveCartCoupon(currentCart, coupon);
    return { updatedCart: updatedCart.data.cart };
  },
  isOnCart: ({ currentCart, product }) => {
    return Boolean(currentCart && getBasketItemByProduct({ currentCart, product }));
  }
};

const { useCart, setCart } = useCartFactory<Cart, LineItem, ProductVariant, any>(params);

export { useCart, setCart };
