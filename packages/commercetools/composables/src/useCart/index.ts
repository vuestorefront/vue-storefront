import { CustomQueryFn } from '@vue-storefront/commercetools-api';
import { ProductVariant, Cart, LineItem } from './../types/GraphQL';
import loadCurrentCart from './currentCart';
import { AgnosticCoupon, useCartFactory, UseCartFactoryParams, Context } from '@vue-storefront/core';

const getBasketItemByProduct = ({ currentCart, product }) => {
  return currentCart.lineItems.find((item) => item.productId === product._id);
};

/** returns current cart or creates new one **/
const getCurrentCart = async (context: Context, currentCart) => {
  if (!currentCart) {
    return loadCurrentCart(context);
  }

  return currentCart;
};

const params: UseCartFactoryParams<Cart, LineItem, ProductVariant, AgnosticCoupon> = {
  loadCart: async (context: Context, CustomQueryFn?: any) => {
    const { $api, $settings } = context;

    if (!$api.isTokenUserSession($settings.currentToken)) {
      return null;
    }

    return await loadCurrentCart(context, CustomQueryFn);
  },
  addToCart: async (context: Context, { currentCart, product, quantity }, customQuery?: CustomQueryFn) => {
    const loadedCart = await getCurrentCart(context, currentCart);

    const { data } = await context.$api.addToCart(loadedCart, product, quantity, customQuery);
    return data.cart;
  },
  removeFromCart: async (context: Context, { currentCart, product }, customQuery?: CustomQueryFn) => {
    const loadedCart = await getCurrentCart(context, currentCart);

    const { data } = await context.$api.removeFromCart(loadedCart, product, customQuery);
    return data.cart;
  },
  updateQuantity: async (context: Context, { currentCart, product, quantity }, customQuery?: CustomQueryFn) => {
    const loadedCart = await getCurrentCart(context, currentCart);

    const { data } = await context.$api.updateCartQuantity(loadedCart, { ...product, quantity }, customQuery);
    return data.cart;
  },
  clearCart: async (context: Context, { currentCart }) => {
    return currentCart;
  },
  applyCoupon: async (context: Context, { currentCart, couponCode }, customQuery?: CustomQueryFn) => {
    const loadedCart = await getCurrentCart(context, currentCart);

    const { data } = await context.$api.applyCartCoupon(loadedCart, couponCode, customQuery);
    return { updatedCart: data.cart, updatedCoupon: couponCode };
  },
  removeCoupon: async (context: Context, { currentCart, coupon }, customQuery?: CustomQueryFn) => {
    const loadedCart = await getCurrentCart(context, currentCart);

    const { data } = await context.$api.removeCartCoupon(loadedCart, { id: coupon.id, typeId: 'discount-code' }, customQuery);
    return { updatedCart: data.cart };
  },
  isOnCart: (context: Context, { currentCart, product }) => {
    return Boolean(currentCart && getBasketItemByProduct({ currentCart, product }));
  }
};

const { useCart } = useCartFactory<Cart, LineItem, ProductVariant, AgnosticCoupon>(params);

export { useCart };
