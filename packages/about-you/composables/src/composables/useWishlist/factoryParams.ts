import {
  getWishlist,
  addItemToWishlist,
  deleteItemFromWishlist
} from '@vue-storefront/about-you-api';
import { UseWishlistFactoryParams } from '@vue-storefront/core';
import { BapiProduct, WishlistResponseData, WishlistItem, WishlistWith } from '../../types';

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

const getWishlistItemByProduct = ({ currentWishlist, product }) => {
  return currentWishlist.items.find((item: WishlistItem) => item.product.id === product.id);
};

export const params: UseWishlistFactoryParams<WishlistResponseData, WishlistItem, BapiProduct> = {
  isOnWishlist: ({currentWishlist, product}) => Boolean(getWishlistItemByProduct({currentWishlist, product})),
  loadWishlist: async () => {
    return await getWishlist(null, { with: wishlistWith });
  },
  addToWishlist: async ({ currentWishlist, product }) => {
    if (getWishlistItemByProduct({ currentWishlist, product })) {
      return currentWishlist;
    }
    const addItemToWishlistResponse = await addItemToWishlist(
      null,
      { productId: product.id },
      { with: wishlistWith }
    );

    if (addItemToWishlistResponse.type === 'success') {
      return Promise.resolve(addItemToWishlistResponse.wishlist);
    }

    throw Error('AddItemToWishlist response returns type failure');
  },
  removeFromWishlist: async ({ product }) => {
    return await deleteItemFromWishlist(null, product.key, {with: wishlistWith});
  },
  clearWishlist: async ({ currentWishlist }) => {
    return (await Promise.all(currentWishlist.items.map(product => deleteItemFromWishlist(null, product.key)))).pop();
  }
};
