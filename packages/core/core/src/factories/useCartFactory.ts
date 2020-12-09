import { CustomQuery, UseCart, Context, FactoryParams } from '../types';
import { Ref, computed } from '@vue/composition-api';
import { sharedRef, Logger, generateContext } from '../utils';
import { markDeprecated } from '../helpers';

export interface UseCartFactoryParams<CART, CART_ITEM, PRODUCT, COUPON> extends FactoryParams {
  loadCart?: (context: Context, customQuery?: CustomQuery) => Promise<CART>;
  load?: (context: Context, customQuery?: CustomQuery) => Promise<CART>;
  addToCart: (
    context: Context,
    params: {
      currentCart: CART;
      product: PRODUCT;
      quantity: any;
      customQuery?: CustomQuery;
    }
  ) => Promise<CART>;
  removeFromCart: (context: Context, params: { currentCart: CART; product: CART_ITEM; customQuery?: CustomQuery }) => Promise<CART>;
  updateQuantity: (
    context: Context,
    params: { currentCart: CART; product: CART_ITEM; quantity: number; customQuery?: CustomQuery },
  ) => Promise<CART>;
  clearCart: (context: Context, params: { currentCart: CART }) => Promise<CART>;
  applyCoupon: (context: Context, params: { currentCart: CART; couponCode: string; customQuery?: CustomQuery }) => Promise<{ updatedCart: CART }>;
  removeCoupon: (
    context: Context,
    params: { currentCart: CART; coupon: COUPON; customQuery?: CustomQuery }
  ) => Promise<{ updatedCart: CART }>;
  isOnCart: (context: Context, params: { currentCart: CART; product: PRODUCT; customQuery?: CustomQuery }) => boolean;
}

interface UseCartFactory<CART, CART_ITEM, PRODUCT, COUPON> {
  useCart: () => UseCart<CART, CART_ITEM, PRODUCT, COUPON>;
}

export const useCartFactory = <CART, CART_ITEM, PRODUCT, COUPON>(
  factoryParams: UseCartFactoryParams<CART, CART_ITEM, PRODUCT, COUPON>
): UseCartFactory<CART, CART_ITEM, PRODUCT, COUPON> => {

  const useCart = (): UseCart<CART, CART_ITEM, PRODUCT, COUPON> => {
    const loading: Ref<boolean> = sharedRef(false, 'useCart-loading');
    const cart: Ref<CART> = sharedRef(null, 'useCart-cart');
    const context = generateContext(factoryParams);

    const setCart = (newCart: CART) => {
      cart.value = newCart;
      Logger.debug('useCartFactory.setCart', newCart);
    };

    const addToCart = async (product: PRODUCT, quantity: number, customQuery?: CustomQuery) => {
      Logger.debug('useCart.addToCart', { product, quantity });

      loading.value = true;
      const updatedCart = await factoryParams.addToCart(
        context,
        {
          currentCart: cart.value,
          product,
          quantity,
          customQuery
        }
      );
      cart.value = updatedCart;
      loading.value = false;
    };

    const removeFromCart = async (product: CART_ITEM, customQuery?: CustomQuery) => {
      Logger.debug('useCart.removeFromCart', { product });

      loading.value = true;
      const updatedCart = await factoryParams.removeFromCart(
        context,
        {
          currentCart: cart.value,
          product,
          customQuery
        }
      );
      cart.value = updatedCart;
      loading.value = false;
    };

    const updateQuantity = async (product: CART_ITEM, quantity?: number, customQuery?: CustomQuery) => {
      Logger.debug('useCart.updateQuantity', { product, quantity });

      if (quantity && quantity > 0) {
        loading.value = true;
        const updatedCart = await factoryParams.updateQuantity(
          context,
          {
            currentCart: cart.value,
            product,
            quantity,
            customQuery
          }
        );
        cart.value = updatedCart;
        loading.value = false;
      }
    };

    const load = async (customQuery?: CustomQuery) => {
      Logger.debug('useCart.load');

      if (cart.value) {

        /**
          * Triggering change for hydration purpose,
          * temporary issue related with cpapi plugin
          */
        loading.value = false;
        cart.value = { ...cart.value };
        return;
      }
      loading.value = true;
      cart.value = await markDeprecated(
        '\'loadCart\' is deprecated, use \'load\' in your integration instead',
        factoryParams.load,
        factoryParams.loadCart
      )(context, customQuery);
      loading.value = false;
    };

    const clearCart = async () => {
      Logger.debug('useCart.clearCart');

      loading.value = true;
      const updatedCart = await factoryParams.clearCart(context, { currentCart: cart.value });
      cart.value = updatedCart;
      loading.value = false;
    };

    const isOnCart = (product: PRODUCT) => {
      return factoryParams.isOnCart(context, {
        currentCart: cart.value,
        product
      });
    };

    const applyCoupon = async (couponCode: string, customQuery?: CustomQuery) => {
      Logger.debug('useCart.applyCoupon');

      try {
        loading.value = true;
        const { updatedCart } = await factoryParams.applyCoupon(context, {
          currentCart: cart.value,
          couponCode,
          customQuery
        });
        cart.value = updatedCart;
      } catch (e) {
        Logger.error('useCart.applyCoupon', e);
        throw e;
      } finally {
        loading.value = false;
      }
    };

    const removeCoupon = async (coupon: COUPON, customQuery?: CustomQuery) => {
      Logger.debug('useCart.removeCoupon');

      try {
        loading.value = true;
        const { updatedCart } = await factoryParams.removeCoupon(
          context,
          {
            currentCart: cart.value,
            coupon,
            customQuery
          }
        );
        cart.value = updatedCart;
        loading.value = false;
      } catch (e) {
        Logger.error('useCart.applyCoupon', e);
        throw e;
      } finally {
        loading.value = false;
      }
    };

    return {
      setCart,
      cart: computed(() => cart.value),
      isOnCart,
      addToCart,
      load,
      removeFromCart,
      clearCart,
      updateQuantity,
      applyCoupon,
      removeCoupon,
      loading: computed(() => loading.value)
    };
  };

  return { useCart };
};
