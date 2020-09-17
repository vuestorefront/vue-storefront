import {
  addToCart as apiAddToCart,
  removeFromCart as apiRemoveFromCart,
  updateCartQuantity as apiUpdateCartQuantity,
  applyCartCoupon as apiApplyCartCoupon,
  removeCartCoupon as apiRemoveCartCoupon
} from '@vue-storefront/commercetools-api';
import { ProductVariant, Cart, LineItem } from './../types/GraphQL';
import loadCurrentCart from './currentCart';
import { CustomQuery, useCartFactory, UseCartFactoryParams } from '@vue-storefront/core';

const getBasketItemByProduct = ({ currentCart, product }) => {
  return currentCart.lineItems.find((item) => item.productId === product._id);
};

const params: UseCartFactoryParams<Cart, LineItem, ProductVariant, any> = {
  loadCart: async (customQuery?: CustomQuery) => {
    return await loadCurrentCart(customQuery);
  },
  addToCart: async ({ currentCart, product, quantity }, customQuery?: CustomQuery) => {
    const { data } = await apiAddToCart(currentCart, product, quantity, customQuery);
    return data.cart;
  },
  removeFromCart: async ({ currentCart, product }, customQuery?: CustomQuery) => {
    const { data } = await apiRemoveFromCart(currentCart, product, customQuery);
    return data.cart;
  },
  updateQuantity: async ({ currentCart, product, quantity }) => {
    const { data } = await apiUpdateCartQuantity(currentCart, { ...product, quantity });
    return data.cart;
  },
  clearCart: async ({ currentCart }) => {
    return currentCart;
  },
  applyCoupon: async ({ currentCart, coupon }) => {
    const { data } = await apiApplyCartCoupon(currentCart, coupon);
    return { updatedCart: data.cart, updatedCoupon: coupon };
  },
  removeCoupon: async ({ currentCart, coupon }) => {
    const { data } = await apiRemoveCartCoupon(currentCart, coupon);
    return { updatedCart: data.cart };
  },
  isOnCart: ({ currentCart, product }) => {
    return Boolean(currentCart && getBasketItemByProduct({ currentCart, product }));
  }
};

const { useCart, setCart } = useCartFactory<Cart, LineItem, ProductVariant, any>(params);

export { useCart, setCart };
