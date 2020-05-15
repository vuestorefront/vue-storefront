import { useWishlistFactory, UseWishlistFactoryParams } from '@vue-storefront/core';
import { getWishlist, addItemToWishlist, deleteItemFromWishlist } from '@vue-storefront/about-you-api';
import { BapiProduct, BapiWishlist, BapiWishlistProduct } from '../../types';
import { WishlistWith } from '@aboutyou/backbone/endpoints/wishlist/getWishlist';

const wishlistWith: WishlistWith = {
  items: {
    product: {
      attributes: 'all',
      advancedAttributes: 'all',
      variants: 'all',
      images: 'all',
      siblings: 'all',
      categories: 'all',
      priceRange: true
    },
    variant: {
      attributes: 'all',
      advancedAttributes: 'all',
      stock: 'all'
    }
  }
};
const params: UseWishlistFactoryParams<BapiWishlist, BapiProduct, BapiWishlistProduct> = {
  loadWishlist: async ({ currentWishlist }) => {
    return await getWishlist(currentWishlist?.key ?? null, { with: wishlistWith });
  },
  addToWishlist: async ({currentWishlist, product }) => {
    const addItemToWishlistResponse = await addItemToWishlist(currentWishlist.key, { productId: product.id });
    if (addItemToWishlistResponse.type === 'success') {
      return Promise.resolve(addItemToWishlistResponse.wishlist);
    }
    return Promise.reject();
  },
  removeFromWishlist: async ({currentWishlist, wishlistItem }) => {
    return await deleteItemFromWishlist(currentWishlist?.key, wishlistItem?.key);
  },
  clearWishlist: async () => {
    throw new Error('This feature is not available in AYC');
  }
};

const { useWishlist, setWishlist } = useWishlistFactory<BapiWishlist, BapiProduct, BapiWishlistProduct>(params);

export {useWishlist, setWishlist};
