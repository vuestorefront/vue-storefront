import { UseWishlist, CustomQuery, Context, FactoryParams, UseWishlistErrors } from '../types';
import { Ref, computed } from '@vue/composition-api';
import { sharedRef, Logger, configureFactoryParams } from '../utils';

export interface UseWishlistFactoryParams<WISHLIST, WISHLIST_ITEM, PRODUCT> extends FactoryParams {
  load: (context: Context, params: { customQuery?: CustomQuery }) => Promise<WISHLIST>;
  addItem: (
    context: Context,
    params: {
      currentWishlist: WISHLIST;
      product: PRODUCT;
      customQuery?: CustomQuery;
    }) => Promise<WISHLIST>;
  removeItem: (
    context: Context,
    params: {
      currentWishlist: WISHLIST;
      product: WISHLIST_ITEM;
      customQuery?: CustomQuery;
    }) => Promise<WISHLIST>;
  clear: (context: Context, params: { currentWishlist: WISHLIST }) => Promise<WISHLIST>;
  isInWishlist: (context: Context, params: { currentWishlist: WISHLIST; product: PRODUCT }) => boolean;
}

export const useWishlistFactory = <WISHLIST, WISHLIST_ITEM, PRODUCT>(
  factoryParams: UseWishlistFactoryParams<WISHLIST, WISHLIST_ITEM, PRODUCT>
) => {
  const useWishlist = (): UseWishlist<WISHLIST, WISHLIST_ITEM, PRODUCT> => {
    const loading: Ref<boolean> = sharedRef<boolean>(false, 'useWishlist-loading');
    const wishlist: Ref<WISHLIST> = sharedRef(null, 'useWishlist-wishlist');
    const _factoryParams = configureFactoryParams(factoryParams);
    const error: Ref<UseWishlistErrors> = sharedRef({
      addItem: null,
      removeItem: null,
      load: null,
      clear: null
    }, 'useWishlist-error');

    const setWishlist = (newWishlist: WISHLIST) => {
      wishlist.value = newWishlist;
      Logger.debug('useWishlistFactory.setWishlist', newWishlist);
    };

    const addItem = async ({ product, customQuery }) => {
      Logger.debug('useWishlist.addItem', product);

      try {
        loading.value = true;
        const updatedWishlist = await _factoryParams.addItem({
          currentWishlist: wishlist.value,
          product,
          customQuery
        });
        error.value.addItem = null;
        wishlist.value = updatedWishlist;
      } catch (err) {
        error.value.addItem = err;
        Logger.error('useWishlist/addItem', err);
      } finally {
        loading.value = false;
      }
    };

    const removeItem = async ({ product, customQuery }) => {
      Logger.debug('useWishlist.removeItem', product);

      try {
        loading.value = true;
        const updatedWishlist = await _factoryParams.removeItem({
          currentWishlist: wishlist.value,
          product,
          customQuery
        });
        error.value.removeItem = null;
        wishlist.value = updatedWishlist;
      } catch (err) {
        error.value.removeItem = err;
        Logger.error('useWishlist/removeItem', err);
      } finally {
        loading.value = false;
      }
    };

    const load = async ({ customQuery } = { customQuery: undefined }) => {
      Logger.debug('useWishlist.load');
      if (wishlist.value) return;

      try {
        loading.value = true;
        wishlist.value = await _factoryParams.load({ customQuery });
        error.value.load = null;
      } catch (err) {
        error.value.load = err;
        Logger.error('useWishlist/load', err);
      } finally {
        loading.value = false;
      }
    };

    const clear = async () => {
      Logger.debug('useWishlist.clear');

      try {
        loading.value = true;
        const updatedWishlist = await _factoryParams.clear({
          currentWishlist: wishlist.value
        });
        error.value.clear = null;
        wishlist.value = updatedWishlist;
      } catch (err) {
        error.value.clear = err;
        Logger.error('useWishlist/clear', err);
      } finally {
        loading.value = false;
      }
    };

    const isInWishlist = ({ product }) => {
      Logger.debug('useWishlist.isInWishlist', product);

      return _factoryParams.isInWishlist({
        currentWishlist: wishlist.value,
        product
      });
    };

    return {
      wishlist: computed(() => wishlist.value),
      isInWishlist,
      addItem,
      load,
      removeItem,
      clear,
      setWishlist,
      loading: computed(() => loading.value),
      error: computed(() => error.value)
    };
  };

  return useWishlist;
};

