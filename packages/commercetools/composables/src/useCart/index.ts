import {
  addToCart,
  removeFromCart,
  updateCartQuantity,
  applyCartCoupon,
  removeCartCoupon,
  isTokenUserSession,
  getMe,
  createCart,
  CustomQueryFn
} from '@vue-storefront/commercetools-api';
import { ProductVariant, Cart, LineItem } from './../types/GraphQL';
import loadCurrentCart from './currentCart';
import { AgnosticCoupon, useCartFactory, UseCartFactoryParams } from '@vue-storefront/core';

const getBasketItemByProduct = ({ currentCart, product }) => {
  return currentCart.lineItems.find((item) => item.productId === product._id);
};

/** returns current cart or creates new one **/
const getCurrentCart = async (api, currentCart) => {
  if (!currentCart) {
    return loadCurrentCart(api);
  }

  return currentCart;
};

const params: UseCartFactoryParams<Cart, LineItem, ProductVariant, AgnosticCoupon, any> = {
  async loadCart (CustomQueryFn?: any) {
    if (!isTokenUserSession(this.$vsf.ct, this.$vsf.ct.currentToken)) {
      return null;
    }

    return await loadCurrentCart(this.api, CustomQueryFn);
  },
  async addToCart({ currentCart, product, quantity }, customQuery?: CustomQueryFn) {
    const loadedCart = await getCurrentCart(this.api, currentCart);

    const { data } = await this.api.addToCart(loadedCart, product, quantity, customQuery);
    return data.cart;
  },
  async removeFromCart({ currentCart, product }, customQuery?: CustomQueryFn) {
    const loadedCart = await getCurrentCart(this.api, currentCart);

    const { data } = await this.api.removeFromCart(loadedCart, product, customQuery);
    return data.cart;
  },
  async updateQuantity({ currentCart, product, quantity }, customQuery?: CustomQueryFn) {
    const loadedCart = await getCurrentCart(this.api, currentCart);

    const { data } = await this.api.updateCartQuantity(loadedCart, { ...product, quantity }, customQuery);
    return data.cart;
  },
  async clearCart({ currentCart }) {
    return currentCart;
  },
  async applyCoupon({ currentCart, couponCode }, customQuery?: CustomQueryFn) {
    const loadedCart = await getCurrentCart(this.api, currentCart);

    const { data } = await this.api.applyCartCoupon(loadedCart, couponCode, customQuery);
    return { updatedCart: data.cart, updatedCoupon: couponCode };
  },
  async removeCoupon({ currentCart, coupon }, customQuery?: CustomQueryFn) {
    const loadedCart = await getCurrentCart(this.api, currentCart);

    const { data } = await this.api.removeCartCoupon(loadedCart, { id: coupon.id, typeId: 'discount-code' }, customQuery);
    return { updatedCart: data.cart };
  },
  isOnCart({ currentCart, product }) {
    return Boolean(currentCart && getBasketItemByProduct({ currentCart, product }));
  },
  api: {
    addToCart,
    removeFromCart,
    updateCartQuantity,
    applyCartCoupon,
    removeCartCoupon,
    getMe,
    createCart
  }
};

const { useCart, setCart } = useCartFactory<Cart, LineItem, ProductVariant, AgnosticCoupon, any>(params);

export { useCart, setCart };
