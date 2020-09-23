import { CustomQuery, UseCart } from '../types';
import { Ref, computed } from '@vue/composition-api';
import { sharedRef } from '../utils';

export type UseCartFactoryParams<CART, CART_ITEM, PRODUCT, COUPON> = {
  loadCart: (customQuery?: CustomQuery) => Promise<CART>;
  addToCart: (
    params: {
      currentCart: CART;
      product: PRODUCT;
      quantity: any;
    },
    customQuery?: CustomQuery
  ) => Promise<CART>;
  removeFromCart: (params: { currentCart: CART; product: CART_ITEM }, customQuery?: CustomQuery) => Promise<CART>;
  updateQuantity: (
    params: { currentCart: CART; product: CART_ITEM; quantity: number },
    customQuery?: CustomQuery
  ) => Promise<CART>;
  clearCart: (prams: { currentCart: CART }) => Promise<CART>;
  applyCoupon: (params: { currentCart: CART; couponCode: string }, customQuery?: CustomQuery) => Promise<{ updatedCart: CART }>;
  removeCoupon: (
    params: { currentCart: CART; coupon: COUPON },
    customQuery?: CustomQuery
  ) => Promise<{ updatedCart: CART }>;
  isOnCart: (params: { currentCart: CART; product: PRODUCT }) => boolean;
};

interface UseCartFactory<CART, CART_ITEM, PRODUCT, COUPON> {
  useCart: () => UseCart<CART, CART_ITEM, PRODUCT, COUPON>;
  setCart: (cart: CART) => void;
}

export const useCartFactory = <CART, CART_ITEM, PRODUCT, COUPON>(
  factoryParams: UseCartFactoryParams<CART, CART_ITEM, PRODUCT, COUPON>
): UseCartFactory<CART, CART_ITEM, PRODUCT, COUPON> => {
  const setCart = (newCart: CART) => {
    sharedRef('useCart-cart').value = newCart;
  };

  const useCart = (): UseCart<CART, CART_ITEM, PRODUCT, COUPON> => {
    const loading: Ref<boolean> = sharedRef(false, 'useCart-loading');
    const cart: Ref<CART> = sharedRef(null, 'useCart-cart');

    const addToCart = async (product: PRODUCT, quantity: number, customQuery?: CustomQuery) => {
      loading.value = true;
      const updatedCart = await factoryParams.addToCart(
        {
          currentCart: cart.value,
          product,
          quantity
        },
        customQuery
      );
      cart.value = updatedCart;
      loading.value = false;
    };

    const removeFromCart = async (product: CART_ITEM, customQuery?: CustomQuery) => {
      loading.value = true;
      const updatedCart = await factoryParams.removeFromCart(
        {
          currentCart: cart.value,
          product
        },
        customQuery
      );
      cart.value = updatedCart;
      loading.value = false;
    };

    const updateQuantity = async (product: CART_ITEM, quantity?: number, customQuery?: CustomQuery) => {
      if (quantity && quantity > 0) {
        loading.value = true;
        const updatedCart = await factoryParams.updateQuantity(
          {
            currentCart: cart.value,
            product,
            quantity
          },
          customQuery
        );
        cart.value = updatedCart;
        loading.value = false;
      }
    };

    const loadCart = async (customQuery?: CustomQuery) => {
      if (cart.value) return;

      loading.value = true;
      cart.value = await factoryParams.loadCart(customQuery);
      loading.value = false;
    };

    const clearCart = async () => {
      loading.value = true;
      const updatedCart = await factoryParams.clearCart({ currentCart: cart.value });
      cart.value = updatedCart;
      loading.value = false;
    };

    const isOnCart = (product: PRODUCT) => {
      return factoryParams.isOnCart({
        currentCart: cart.value,
        product
      });
    };

    const applyCoupon = async (couponCode: string, customQuery?: CustomQuery) => {
      try {
        loading.value = true;
        const { updatedCart } = await factoryParams.applyCoupon({
          currentCart: cart.value,
          couponCode
        }, customQuery);
        cart.value = updatedCart;
      } finally {
        loading.value = false;
      }
    };

    const removeCoupon = async (coupon: COUPON, customQuery?: CustomQuery) => {
      try {
        loading.value = true;
        const { updatedCart } = await factoryParams.removeCoupon(
          {
            currentCart: cart.value,
            coupon
          },
          customQuery
        );
        cart.value = updatedCart;
        loading.value = false;
      } finally {
        loading.value = false;
      }
    };

    return {
      cart: computed(() => cart.value),
      isOnCart,
      addToCart,
      loadCart,
      removeFromCart,
      clearCart,
      updateQuantity,
      applyCoupon,
      removeCoupon,
      loading: computed(() => loading.value)
    };
  };

  return { useCart, setCart };
};
