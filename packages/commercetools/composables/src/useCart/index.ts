import {
  addToCart as apiAddToCart,
  removeFromCart as apiRemoveFromCart,
  updateCartQuantity as apiUpdateCartQuantity,
  applyCartCoupon as apiApplyCartCoupon,
  removeCartCoupon as apiRemoveCartCoupon,
  getSettings,
  isTokenUserSession
} from '@vue-storefront/commercetools-api';
import { ProductVariant, Cart, LineItem } from './../types/GraphQL';
import loadCurrentCart from './currentCart';
import { CustomQuery, useCartFactory, UseCartFactoryParams } from '@vue-storefront/core';

const getBasketItemByProduct = ({ currentCart, product }) => {
  return currentCart.lineItems.find((item) => item.productId === product._id);
};

/** returns current cart or creates new one **/
const getCurrentCart = async (currentCart) => {
  if (!currentCart) {
    return loadCurrentCart();
  }

  return currentCart;
};

const params: UseCartFactoryParams<Cart, LineItem, ProductVariant, any> = {
  loadCart: async (customQuery?: any) => {
    const settings = getSettings();

    if (!isTokenUserSession(settings.currentToken)) {
      return null;
    }

    return await loadCurrentCart(customQuery);
  },
  addToCart: async ({ currentCart, product, quantity }, customQuery?: CustomQuery) => {
    const loadedCart = await getCurrentCart(currentCart);

    const { data } = await apiAddToCart(loadedCart, product, quantity, customQuery);
    return data.cart;
  },
  removeFromCart: async ({ currentCart, product }, customQuery?: CustomQuery) => {
    const loadedCart = await getCurrentCart(currentCart);

    const { data } = await apiRemoveFromCart(loadedCart, product, customQuery);
    return data.cart;
  },
  updateQuantity: async ({ currentCart, product, quantity }, customQuery?: CustomQuery) => {
    const loadedCart = await getCurrentCart(currentCart);

    const { data } = await apiUpdateCartQuantity(loadedCart, { ...product, quantity }, customQuery);
    return data.cart;
  },
  clearCart: async ({ currentCart }) => {
    return currentCart;
  },
  applyCoupon: async ({ currentCart, coupon }, customQuery?: CustomQuery) => {
    const loadedCart = await getCurrentCart(currentCart);

    const { data } = await apiApplyCartCoupon(loadedCart, coupon, customQuery);
    return { updatedCart: data.cart, updatedCoupon: coupon };
  },
  removeCoupon: async ({ currentCart, coupon }, customQuery?: CustomQuery) => {
    const loadedCart = await getCurrentCart(currentCart);

    const { data } = await apiRemoveCartCoupon(loadedCart, coupon, customQuery);
    return { updatedCart: data.cart };
  },
  isOnCart: ({ currentCart, product }) => {
    return Boolean(currentCart && getBasketItemByProduct({ currentCart, product }));
  }
};

const { useCart, setCart } = useCartFactory<Cart, LineItem, ProductVariant, any>(params);

export { useCart, setCart };
