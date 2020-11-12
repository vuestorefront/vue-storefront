import {
  addToCart as apiAddToCart,
  removeFromCart as apiRemoveFromCart,
  updateCartQuantity as apiUpdateCartQuantity,
  applyCartCoupon as apiApplyCartCoupon,
  removeCartCoupon as apiRemoveCartCoupon,
  isTokenUserSession,
  CustomQueryFn
} from '@vue-storefront/commercetools-api';
import { ProductVariant, Cart, LineItem } from './../types/GraphQL';
import loadCurrentCart from './currentCart';
import { AgnosticCoupon, useCartFactory, UseCartFactoryParams } from '@vue-storefront/core';

const getBasketItemByProduct = ({ currentCart, product }) => {
  return currentCart.lineItems.find((item) => item.productId === product._id);
};

/** returns current cart or creates new one **/
const getCurrentCart = async (context, currentCart) => {
  if (!currentCart) {
    return loadCurrentCart(context);
  }

  return currentCart;
};

const params: UseCartFactoryParams<Cart, LineItem, ProductVariant, AgnosticCoupon> = {
  loadCart: async (context, CustomQueryFn?: any) => {
    if (!isTokenUserSession(context.$vsfSettings, context.$vsfSettings.currentToken)) {
      return null;
    }

    return await loadCurrentCart(context, CustomQueryFn);
  },
  addToCart: async (context, { currentCart, product, quantity }, customQuery?: CustomQueryFn) => {
    const loadedCart = await getCurrentCart(context, currentCart);

    const { data } = await apiAddToCart(context, loadedCart, product, quantity, customQuery);
    return data.cart;
  },
  removeFromCart: async (context, { currentCart, product }, customQuery?: CustomQueryFn) => {
    const loadedCart = await getCurrentCart(context, currentCart);

    const { data } = await apiRemoveFromCart(context, loadedCart, product, customQuery);
    return data.cart;
  },
  updateQuantity: async (context, { currentCart, product, quantity }, customQuery?: CustomQueryFn) => {
    const loadedCart = await getCurrentCart(context, currentCart);

    const { data } = await apiUpdateCartQuantity(context, loadedCart, { ...product, quantity }, customQuery);
    return data.cart;
  },
  clearCart: async (context, { currentCart }) => {
    return currentCart;
  },
  applyCoupon: async (context, { currentCart, couponCode }, customQuery?: CustomQueryFn) => {
    const loadedCart = await getCurrentCart(context, currentCart);

    const { data } = await apiApplyCartCoupon(context, loadedCart, couponCode, customQuery);
    return { updatedCart: data.cart, updatedCoupon: couponCode };
  },
  removeCoupon: async (context, { currentCart, coupon }, customQuery?: CustomQueryFn) => {
    const loadedCart = await getCurrentCart(context, currentCart);

    const { data } = await apiRemoveCartCoupon(context, loadedCart, { id: coupon.id, typeId: 'discount-code' }, customQuery);
    return { updatedCart: data.cart };
  },
  isOnCart: (context, { currentCart, product }) => {
    return Boolean(currentCart && getBasketItemByProduct({ currentCart, product }));
  }
};

const { useCart, setCart } = useCartFactory<Cart, LineItem, ProductVariant, AgnosticCoupon>(params);

export { useCart, setCart };
