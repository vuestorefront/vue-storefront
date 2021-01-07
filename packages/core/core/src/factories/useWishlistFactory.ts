import { UseWishlist, CustomQuery, Context, FactoryParams, UseWishlistErrors } from '../types';
import { Ref, computed } from '@vue/composition-api';
import { sharedRef, Logger, generateContext } from '../utils';

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
  isOnWishlist: (context: Context, params: { currentWishlist: WISHLIST; product: PRODUCT }) => boolean;
}

export const useWishlistFactory = <WISHLIST, WISHLIST_ITEM, PRODUCT>(
  factoryParams: UseWishlistFactoryParams<WISHLIST, WISHLIST_ITEM, PRODUCT>
) => {
  const useWishlist = (): UseWishlist<WISHLIST, WISHLIST_ITEM, PRODUCT> => {
    const loading: Ref<boolean> = sharedRef<boolean>(false, 'useWishlist-loading');
    const wishlist: Ref<WISHLIST> = sharedRef(null, 'useWishlist-wishlist');
    const context = generateContext(factoryParams);
    const error: Ref<UseWishlistErrors> = sharedRef({}, 'useWishlist-error');

    const setWishlist = (newWishlist: WISHLIST) => {
      wishlist.value = newWishlist;
      Logger.debug('useWishlistFactory.setWishlist', newWishlist);
    };

    const addItem = async ({ product, customQuery }) => {
      Logger.debug('useWishlist.addItem', product);

      try {
        loading.value = true;
        error.value.addItem = null;
        const updatedWishlist = await factoryParams.addItem(
          context,
          {
            currentWishlist: wishlist.value,
            product,
            customQuery
          }
        );
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
        error.value.removeItem = null;
        const updatedWishlist = await factoryParams.removeItem(
          context,
          {
            currentWishlist: wishlist.value,
            product,
            customQuery
          }
        );
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
        error.value.load = null;
        wishlist.value = await factoryParams.load(context, { customQuery });
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
        error.value.clear = null;
        const updatedWishlist = await factoryParams.clear(context, {
          currentWishlist: wishlist.value
        });
        wishlist.value = updatedWishlist;
      } catch (err) {
        error.value.clear = err;
        Logger.error('useWishlist/clear', err);
      } finally {
        loading.value = false;
      }
    };

    const isOnWishlist = ({ product }) => {
      Logger.debug('useWishlist.isOnWishlist', product);

      return factoryParams.isOnWishlist(context, {
        currentWishlist: wishlist.value,
        product
      });
    };

    return {
      wishlist: computed(() => wishlist.value),
      isOnWishlist,
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

