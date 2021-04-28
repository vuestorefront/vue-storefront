import loadCurrentCart from './currentCart';
import { ProductVariant, LineItem } from './../types/GraphQL';
import { CartDetails } from '@vue-storefront/commercetools-api';
import { AgnosticCoupon, useCartFactory, UseCartFactoryParams, Context } from '@vue-storefront/core';

const getCartItemByProduct = ({ currentCart, product }) => {
  return currentCart.lineItems.find((item) => item.productId === product._id);
};

/** returns current cart or creates new one **/
const getCurrentCartDetails = async (context: Context, currentCart): Promise<CartDetails> => {
  const { id, version } = currentCart || await loadCurrentCart(context);

  return { id, version };
};

const params: UseCartFactoryParams<CartDetails, LineItem, ProductVariant, AgnosticCoupon> = {
  load: async (context: Context, { customQuery }) => {
    const { $ct } = context;

    const isGuest = await $ct.api.isGuest();

    if (isGuest) {
      return null;
    }

    const { data: profileData } = await context.$ct.api.getMe({ customer: false }, customQuery);

    return profileData.me.activeCart;
  },
  addItem: async (context: Context, { currentCart, product, quantity, customQuery }) => {
    const cartDetails = await getCurrentCartDetails(context, currentCart);

    const { data } = await context.$ct.api.addToCart(cartDetails, product, quantity, customQuery);
    return data.cart;
  },
  removeItem: async (context: Context, { currentCart, product, customQuery }) => {
    const cartDetails = await getCurrentCartDetails(context, currentCart);

    const { data } = await context.$ct.api.removeFromCart(cartDetails, product, customQuery);
    return data.cart;
  },
  updateItemQty: async (context: Context, { currentCart, product, quantity, customQuery }) => {
    const cartDetails = await getCurrentCartDetails(context, currentCart);

    const { data } = await context.$ct.api.updateCartQuantity(cartDetails, { ...product, quantity }, customQuery);
    return data.cart;
  },
  clear: async (context: Context, { currentCart }) => {
    return currentCart;
  },
  applyCoupon: async (context: Context, { currentCart, couponCode, customQuery }) => {
    const cartDetails = await getCurrentCartDetails(context, currentCart);

    const { data } = await context.$ct.api.applyCartCoupon(cartDetails, couponCode, customQuery);
    return { updatedCart: data.cart, updatedCoupon: couponCode };
  },
  removeCoupon: async (context: Context, { currentCart, coupon, customQuery }) => {
    const cartDetails = await getCurrentCartDetails(context, currentCart);

    const { data } = await context.$ct.api.removeCartCoupon(cartDetails, { id: coupon.id, typeId: 'discount-code' }, customQuery);
    return { updatedCart: data.cart };
  },
  isInCart: (context: Context, { currentCart, product }) => {
    return Boolean(currentCart && getCartItemByProduct({ currentCart, product }));
  }
};

export default useCartFactory<CartDetails, LineItem, ProductVariant, AgnosticCoupon>(params);
