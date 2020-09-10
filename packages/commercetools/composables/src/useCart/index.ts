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
    const currentCart = await loadCurrentCart();
    const currentCoupon = currentCart && Array.isArray(currentCart.discountCodes) && currentCart.discountCodes.length
      ? currentCart.discountCodes[0]
      : null;

    return {
      currentCart,
      currentCoupon
    };
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
    const updatedCoupon = updatedCart && updatedCart.data && updatedCart.data.cart && Array.isArray(updatedCart.data.cart.discountCodes) && updatedCart.data.cart.discountCodes.length
      ? updatedCart.data.cart.discountCodes[0]
      : null;
    return { updatedCart: updatedCart.data.cart, updatedCoupon };
  },
  removeCoupon: async ({ currentCart, coupon }) => {
    const updatedCart = await apiRemoveCartCoupon(currentCart, { id: coupon.discountCode.id, typeId: 'discount-code' });
    return { updatedCart: updatedCart.data.cart };
  },
  isOnCart: ({ currentCart, product }) => {
    return Boolean(currentCart && getBasketItemByProduct({ currentCart, product }));
  }
};

const { useCart, setCart } = useCartFactory<Cart, LineItem, ProductVariant, any>(params);

export { useCart, setCart };
