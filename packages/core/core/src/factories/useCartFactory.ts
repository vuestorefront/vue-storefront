import { CustomQuery, UseCart, Context, FactoryParams, UseCartErrors } from '../types';
import { Ref, UnwrapRef, computed, reactive } from '@vue/composition-api';
import { sharedRef, Logger, configureFactoryParams } from '../utils';

export interface UseCartFactoryParams<CART, CART_ITEM, PRODUCT, COUPON> extends FactoryParams {
  load: (context: Context, params: { customQuery?: any }) => Promise<CART>;
  addItem: (
    context: Context,
    params: {
      currentCart: CART;
      product: PRODUCT;
      quantity: any;
      customQuery?: CustomQuery;
    }
  ) => Promise<CART>;
  removeItem: (context: Context, params: { currentCart: CART; product: CART_ITEM; customQuery?: CustomQuery }) => Promise<CART>;
  updateItemQty: (
    context: Context,
    params: { currentCart: CART; product: CART_ITEM; quantity: number; customQuery?: CustomQuery }
  ) => Promise<CART>;
  clear: (context: Context, params: { currentCart: CART }) => Promise<CART>;
  applyCoupon: (context: Context, params: { currentCart: CART; couponCode: string; customQuery?: CustomQuery }) => Promise<{ updatedCart: CART }>;
  removeCoupon: (
    context: Context,
    params: { currentCart: CART; coupon: COUPON; customQuery?: CustomQuery }
  ) => Promise<{ updatedCart: CART }>;
  isInCart: (context: Context, params: { currentCart: CART; product: PRODUCT }) => boolean;
}

export const useCartFactory = <CART, CART_ITEM, PRODUCT, COUPON>(
  factoryParams: UseCartFactoryParams<CART, CART_ITEM, PRODUCT, COUPON>
) => {
  return function useCart (): UseCart<CART, CART_ITEM, PRODUCT, COUPON> {
    const loading: Ref<boolean> = sharedRef(false, 'useCart-loading');
    const cart: Ref<CART> = sharedRef(null, 'useCart-cart');
    const _factoryParams = configureFactoryParams(factoryParams);
    const error: UnwrapRef<UseCartErrors> = reactive({
      addItem: null,
      removeItem: null,
      updateItemQty: null,
      load: null,
      clear: null,
      applyCoupon: null,
      removeCoupon: null
    });

    const setCart = (newCart: CART) => {
      cart.value = newCart;
      Logger.debug('useCartFactory.setCart', newCart);
    };

    const addItem = async ({ product, quantity, customQuery }) => {
      Logger.debug('useCart.addItem', { product, quantity });

      try {
        loading.value = true;
        const updatedCart = await _factoryParams.addItem({
          currentCart: cart.value,
          product,
          quantity,
          customQuery
        });
        error.addItem = null;
        cart.value = updatedCart;
      } catch (err) {
        error.addItem = err;
        Logger.error('useCart/addItem', err);
      } finally {
        loading.value = false;
      }
    };

    const removeItem = async ({ product, customQuery }) => {
      Logger.debug('useCart.removeItem', { product });

      try {
        loading.value = true;
        const updatedCart = await _factoryParams.removeItem({
          currentCart: cart.value,
          product,
          customQuery
        });
        error.removeItem = null;
        cart.value = updatedCart;
      } catch (err) {
        error.removeItem = err;
        Logger.error('useCart/removeItem', err);
      } finally {
        loading.value = false;
      }
    };

    const updateItemQty = async ({ product, quantity, customQuery }) => {
      Logger.debug('useCart.updateItemQty', { product, quantity });

      if (quantity && quantity > 0) {
        try {
          loading.value = true;
          const updatedCart = await _factoryParams.updateItemQty({
            currentCart: cart.value,
            product,
            quantity,
            customQuery
          });
          error.updateItemQty = null;
          cart.value = updatedCart;
        } catch (err) {
          error.updateItemQty = err;
          Logger.error('useCart/updateItemQty', err);
        } finally {
          loading.value = false;
        }
      }
    };

    const load = async ({ customQuery } = { customQuery: undefined }) => {
      Logger.debug('useCart.load');

      if (cart.value) {

        /**
          * Triggering change for hydration purpose,
          * temporary issue related with cpapi plugin
          */
        loading.value = false;
        error.load = null;
        cart.value = { ...cart.value };
        return;
      }
      try {
        loading.value = true;
        cart.value = await _factoryParams.load({ customQuery });
        error.load = null;
      } catch (err) {
        error.load = err;
        Logger.error('useCart/load', err);
      } finally {
        loading.value = false;
      }
    };

    const clear = async () => {
      Logger.debug('useCart.clear');

      try {
        loading.value = true;
        const updatedCart = await _factoryParams.clear({ currentCart: cart.value });
        error.clear = null;
        cart.value = updatedCart;
      } catch (err) {
        error.clear = err;
        Logger.error('useCart/clear', err);
      } finally {
        loading.value = false;
      }
    };

    const isInCart = ({ product }) => {
      return _factoryParams.isInCart({
        currentCart: cart.value,
        product
      });
    };

    const applyCoupon = async ({ couponCode, customQuery }) => {
      Logger.debug('useCart.applyCoupon');

      try {
        loading.value = true;
        const { updatedCart } = await _factoryParams.applyCoupon({
          currentCart: cart.value,
          couponCode,
          customQuery
        });
        error.applyCoupon = null;
        cart.value = updatedCart;
      } catch (err) {
        error.applyCoupon = err;
        Logger.error('useCart/applyCoupon', err);
      } finally {
        loading.value = false;
      }
    };

    const removeCoupon = async ({ coupon, customQuery }) => {
      Logger.debug('useCart.removeCoupon');

      try {
        loading.value = true;
        const { updatedCart } = await _factoryParams.removeCoupon({
          currentCart: cart.value,
          coupon,
          customQuery
        });
        error.removeCoupon = null;
        cart.value = updatedCart;
        loading.value = false;
      } catch (err) {
        error.removeCoupon = err;
        Logger.error('useCart/removeCoupon', err);
      } finally {
        loading.value = false;
      }
    };

    return {
      setCart,
      cart: computed(() => cart.value),
      isInCart,
      addItem,
      load,
      removeItem,
      clear,
      updateItemQty,
      applyCoupon,
      removeCoupon,
      loading: computed(() => loading.value),
      error: computed(() => error)
    };
  };
};
