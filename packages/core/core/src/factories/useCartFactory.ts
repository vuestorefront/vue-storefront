import { CustomQuery, UseCart } from '../types';
import { Ref, computed } from '@vue/composition-api';
import { sharedRef, Logger } from '../utils';

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
  applyCoupon: (params: { currentCart: CART; coupon: string }, customQuery?: CustomQuery) => Promise<{ updatedCart: CART; updatedCoupon: COUPON }>;
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
    Logger.debug('useCartFactory.setCart', newCart);
  };

  const useCart = (): UseCart<CART, CART_ITEM, PRODUCT, COUPON> => {
    const appliedCoupon: Ref<COUPON | null> = sharedRef(null, 'useCart-appliedCoupon');
    const loading: Ref<boolean> = sharedRef(false, 'useCart-loading');
    const cart: Ref<CART> = sharedRef(null, 'useCart-cart');
    console.log('useCart called', sharedRef);
    const addToCart = async (product: PRODUCT, quantity: number, customQuery?: CustomQuery) => {
      Logger.debug('useCart.addToCart', { product, quantity });

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
      Logger.debug('userCart.removeFromCart', { product });

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
      Logger.debug('userCart.updateQuantity', { product, quantity });

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
      Logger.debug('userCart.loadCart');

      if (cart.value) {

        /**
          * Triggering change for hydration purpose,
          * temporary issue related with cpapi plugin
          */
        cart.value = { ...cart.value };
        return;
      }
      loading.value = true;
      cart.value = await factoryParams.loadCart(customQuery);
      loading.value = false;
    };

    const clearCart = async () => {
      Logger.debug('userCart.clearCart');

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

    const applyCoupon = async (coupon: string, customQuery?: CustomQuery) => {
      Logger.debug('userCart.applyCoupon');

      try {
        loading.value = true;
        const { updatedCart, updatedCoupon } = await factoryParams.applyCoupon({
          currentCart: cart.value,
          coupon
        }, customQuery);
        cart.value = updatedCart;
        appliedCoupon.value = updatedCoupon;
      } catch (e) {
        Logger.error('userCart.applyCoupon', e);
      } finally {
        loading.value = false;
      }
    };

    const removeCoupon = async (customQuery?: CustomQuery) => {
      Logger.debug('userCart.removeCoupon');

      try {
        loading.value = true;
        const { updatedCart } = await factoryParams.removeCoupon(
          {
            currentCart: cart.value,
            coupon: appliedCoupon.value
          },
          customQuery
        );
        cart.value = updatedCart;
        appliedCoupon.value = null;
        loading.value = false;
      } catch (e) {
        Logger.error('userCart.applyCoupon', e);
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
      coupon: computed(() => appliedCoupon.value),
      applyCoupon,
      removeCoupon,
      loading: computed(() => loading.value)
    };
  };

  return { useCart, setCart };
};
