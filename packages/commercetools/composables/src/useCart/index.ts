import {
  addToCart as apiAddToCart,
  removeFromCart as apiRemoveFromCart,
  updateCartQuantity as apiUpdateCartQuantity,
  applyCartCoupon as apiApplyCartCoupon,
  removeCartCoupon as apiRemoveCartCoupon,
  CustomQueryFn
} from '@vue-storefront/commercetools-api';
import { ProductVariant, Cart, LineItem } from './../types/GraphQL';
import loadCurrentCart from './currentCart';
import { useCartFactory, UseCartFactoryParams } from '@vue-storefront/core';

const getBasketItemByProduct = ({ currentCart, product }) => {
  return currentCart.lineItems.find((item) => item.productId === product._id);
};

const params: UseCartFactoryParams<Cart, LineItem, ProductVariant, any> = {
  loadCart: async (customQuery?: CustomQueryFn) => {
    return await loadCurrentCart(customQuery);
  },
  addToCart: async ({ currentCart, product, quantity }, customQuery?: CustomQueryFn) => {
    const { data } = await apiAddToCart(currentCart, product, quantity, customQuery);
    return data.cart;
  },
  removeFromCart: async ({ currentCart, product }, customQuery?: CustomQueryFn) => {
    const { data } = await apiRemoveFromCart(currentCart, product, customQuery);
    return data.cart;
  },
  updateQuantity: async ({ currentCart, product, quantity }, customQuery?: CustomQueryFn) => {
    const { data } = await apiUpdateCartQuantity(currentCart, { ...product, quantity }, customQuery);
    return data.cart;
  },
  clearCart: async ({ currentCart }) => {
    return currentCart;
  },
  applyCoupon: async ({ currentCart, coupon }, customQuery?: CustomQueryFn) => {
    const { data } = await apiApplyCartCoupon(currentCart, coupon, customQuery);
    return { updatedCart: data.cart, updatedCoupon: coupon };
  },
  removeCoupon: async ({ currentCart, coupon }, customQuery?: CustomQueryFn) => {
    const { data } = await apiRemoveCartCoupon(currentCart, coupon, customQuery);
    return { updatedCart: data.cart };
  },
  isOnCart: ({ currentCart, product }) => {
    return Boolean(currentCart && getBasketItemByProduct({ currentCart, product }));
  }
};

const { useCart, setCart } = useCartFactory<Cart, LineItem, ProductVariant, any>(params);

export { useCart, setCart };
