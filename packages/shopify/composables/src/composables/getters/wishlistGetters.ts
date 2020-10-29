import {
  WishlistGetters,
  AgnosticPrice,
  AgnosticTotals
} from '@vue-storefront/core';
import { Wishlist, WishlistProduct } from '../../types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getWishlistItems = (wishlist: Wishlist): WishlistProduct[] => [];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getWishlistItemName = (product: WishlistProduct): string => '';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getWishlistItemImage = (product: WishlistProduct): string => '';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getWishlistItemPrice = (product: WishlistProduct): AgnosticPrice => ({ regular: 0, special: 0 });

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getWishlistItemQty = (product: WishlistProduct): number => 1;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getWishlistItemAttributes = (product: WishlistProduct, filterByAttributeName?: string[]) => ({'': ''});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getWishlistItemSku = (product: WishlistProduct): string => '';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getWishlistTotals = (wishlist: Wishlist): AgnosticTotals => ({ total: 0, subtotal: 0 });

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getWishlistShippingPrice = (wishlist: Wishlist): number => 0;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getWishlistTotalItems = (wishlist: Wishlist): number => 0;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getFormattedPrice = (price: number): string => '';

const wishlistGetters: WishlistGetters<Wishlist, WishlistProduct> = {
  getTotals: getWishlistTotals,
  getShippingPrice: getWishlistShippingPrice,
  getItems: getWishlistItems,
  getItemName: getWishlistItemName,
  getItemImage: getWishlistItemImage,
  getItemPrice: getWishlistItemPrice,
  getItemQty: getWishlistItemQty,
  getItemAttributes: getWishlistItemAttributes,
  getItemSku: getWishlistItemSku,
  getTotalItems: getWishlistTotalItems,
  getFormattedPrice
};

export default wishlistGetters;
