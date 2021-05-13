import { CustomQuery, UseCart, Context, FactoryParams, UseCartErrors } from '../types';
import { Ref, computed } from '@vue/composition-api';
import { sharedRef, Logger, configureFactoryParams, createErrorHandler } from '../utils';

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
    const errorHandler = createErrorHandler<UseCartErrors>({
      addItem: null,
      removeItem: null,
      updateItemQty: null,
      load: null,
      clear: null,
      applyCoupon: null,
      removeCoupon: null
    }, 'useCart-error');

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
        errorHandler.clear('addItem');
        cart.value = updatedCart;
      } catch (err) {
        errorHandler.update('addItem', err);
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
        errorHandler.clear('removeItem');
        cart.value = updatedCart;
      } catch (err) {
        errorHandler.update('removeItem', err);
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
          errorHandler.clear('updateItemQty');
          cart.value = updatedCart;
        } catch (err) {
          errorHandler.update('updateItemQty', err);
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
        errorHandler.clear('load');
        cart.value = { ...cart.value };
        return;
      }
      try {
        loading.value = true;
        cart.value = await _factoryParams.load({ customQuery });
        errorHandler.clear('load');
      } catch (err) {
        errorHandler.update('load', err);
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
        errorHandler.clear('clear');
        cart.value = updatedCart;
      } catch (err) {
        errorHandler.update('clear', err);
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
        errorHandler.clear('applyCoupon');
        cart.value = updatedCart;
      } catch (err) {
        errorHandler.update('applyCoupon', err);
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
        errorHandler.clear('removeCoupon');
        cart.value = updatedCart;
        loading.value = false;
      } catch (err) {
        errorHandler.update('removeCoupon', err);
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
      error: errorHandler.getAll()
    };
  };
};
