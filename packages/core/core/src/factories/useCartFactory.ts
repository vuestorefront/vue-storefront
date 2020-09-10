import { UseCart } from '../types';
import { Ref, computed } from '@vue/composition-api';
import { sharedRef } from '../utils';

export type UseCartFactoryParams<CART, CART_ITEM, PRODUCT> = {
  loadCart: () => Promise<CART>;
  addToCart: (params: {
    currentCart: CART;
    product: PRODUCT;
    quantity: any;
  }) => Promise<CART>;
  removeFromCart: (params: {
    currentCart: CART;
    product: CART_ITEM;
  }) => Promise<CART>;
  updateQuantity: (params: {
    currentCart: CART;
    product: CART_ITEM;
    quantity: number;
  }) => Promise<CART>;
  clearCart: (prams: { currentCart: CART }) => Promise<CART>;
  applyCoupon: (params: {
    currentCart: CART;
    coupon: string;
  }) => Promise<{ updatedCart: CART }>;
  removeCoupon: (params: {
    currentCart: CART;
  }) => Promise<{ updatedCart: CART }>;
  isOnCart: (params: { currentCart: CART; product: PRODUCT }) => boolean;
};

interface UseCartFactory<CART, CART_ITEM, PRODUCT> {
  useCart: () => UseCart<CART, CART_ITEM, PRODUCT>;
  setCart: (cart: CART) => void;
}

export const useCartFactory = <CART, CART_ITEM, PRODUCT>(
  factoryParams: UseCartFactoryParams<CART, CART_ITEM, PRODUCT>
): UseCartFactory<CART, CART_ITEM, PRODUCT> => {

  const setCart = (newCart: CART) => {
    sharedRef('useCart-cart').value = newCart;
  };

  const useCart = (): UseCart<CART, CART_ITEM, PRODUCT> => {
    const loading: Ref<boolean> = sharedRef(false, 'useCart-loading');
    const cart: Ref<CART> = sharedRef(null, 'useCart-cart');

    const addToCart = async (product: PRODUCT, quantity: number) => {
      loading.value = true;
      const updatedCart = await factoryParams.addToCart({
        currentCart: cart.value,
        product,
        quantity
      });
      cart.value = updatedCart;
      loading.value = false;
    };

    const removeFromCart = async (product: CART_ITEM) => {
      loading.value = true;
      const updatedCart = await factoryParams.removeFromCart({
        currentCart: cart.value,
        product
      });
      cart.value = updatedCart;
      loading.value = false;
    };

    const updateQuantity = async (product: CART_ITEM, quantity?: number) => {
      if (quantity && quantity > 0) {
        loading.value = true;
        const updatedCart = await factoryParams.updateQuantity({
          currentCart: cart.value,
          product,
          quantity
        });
        cart.value = updatedCart;
        loading.value = false;
      }
    };

    const loadCart = async () => {
      if (cart.value) return;

      loading.value = true;
      cart.value = await factoryParams.loadCart();
      loading.value = false;
    };

    const clearCart = async () => {
      loading.value = true;
      const updatedCart = await factoryParams.clearCart({
        currentCart: cart.value
      });
      cart.value = updatedCart;
      loading.value = false;
    };

    const isOnCart = (product: PRODUCT) => {
      return factoryParams.isOnCart({
        currentCart: cart.value,
        product
      });
    };

    const applyCoupon = async (coupon: string) => {
      try {
        loading.value = true;
        const { updatedCart } = await factoryParams.applyCoupon({
          currentCart: cart.value,
          coupon
        });
        cart.value = updatedCart;
      } finally {
        loading.value = false;
      }
    };

    const removeCoupon = async () => {
      try {
        loading.value = true;
        const { updatedCart } = await factoryParams.removeCoupon({
          currentCart: cart.value
        });
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
