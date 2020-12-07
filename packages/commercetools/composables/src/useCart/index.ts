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
  load: async (context: Context, customQueryFn?: any) => {
    const { $ct } = context;

    if ($ct.api.isGuest()) {
      return null;
    }

    const { user } = customQueryFn ? customQueryFn() : { user: null };

    const { data: profileData } = await context.$ct.api.getMe({ customer: false }, user);

    return profileData.me.activeCart;
  },
  addToCart: async (context: Context, { currentCart, product, quantity, customQuery }) => {
    const loadedCart = await getCurrentCart(context, currentCart);

    const { data } = await context.$ct.api.addToCart(loadedCart, product, quantity, customQuery);
    return data.cart;
  },
  removeFromCart: async (context: Context, { currentCart, product, customQuery }) => {
    const loadedCart = await getCurrentCart(context, currentCart);

    const { data } = await context.$ct.api.removeFromCart(loadedCart, product, customQuery);
    return data.cart;
  },
  updateQuantity: async (context: Context, { currentCart, product, quantity, customQuery }) => {
    const loadedCart = await getCurrentCart(context, currentCart);

    const { data } = await context.$ct.api.updateCartQuantity(loadedCart, { ...product, quantity }, customQuery);
    return data.cart;
  },
  clearCart: async (context: Context, { currentCart }) => {
    return currentCart;
  },
  applyCoupon: async (context: Context, { currentCart, couponCode, customQuery }) => {
    const loadedCart = await getCurrentCart(context, currentCart);

    const { data } = await context.$ct.api.applyCartCoupon(loadedCart, couponCode, customQuery);
    return { updatedCart: data.cart, updatedCoupon: couponCode };
  },
  removeCoupon: async (context: Context, { currentCart, coupon, customQuery }) => {
    const loadedCart = await getCurrentCart(context, currentCart);

    const { data } = await context.$ct.api.removeCartCoupon(loadedCart, { id: coupon.id, typeId: 'discount-code' }, customQuery);
    return { updatedCart: data.cart };
  },
  isOnCart: (context: Context, { currentCart, product }) => {
    return Boolean(currentCart && getBasketItemByProduct({ currentCart, product }));
  }
};

const { useCart } = useCartFactory<Cart, LineItem, ProductVariant, AgnosticCoupon>(params);

export { useCart };
