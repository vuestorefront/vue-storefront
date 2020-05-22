import {
  WishlistGetters,
  AgnosticPrice,
  AgnosticTotals
} from '@vue-storefront/core';
import { WishlistItem, WishlistResponseData } from '../../types';
import {
  getProductCoverImage,
  getProductName,
  getProductPrice,
  getFormattedPrice,
  getProductId,
  getProductAttributes
} from './productGetters';

export const getWishlistItems = (wishlist: WishlistResponseData): WishlistItem[] => wishlist?.items ?? [];

export const getWishlistItemName = (product: WishlistItem): string => product?.product ? getProductName(product.product) : '';

export const getWishlistItemImage = (product: WishlistItem): string =>
  product?.product ? getProductCoverImage(product.product) : '';

export const getWishlistItemPrice = (product: WishlistItem): AgnosticPrice =>
  product?.product ? getProductPrice(product.product) : { regular: 0, special: 0 };

export const getWishlistItemAttributes = (product: WishlistItem, filterByAttributeName?: string[]) => {
  return product?.product ? getProductAttributes(product.product, filterByAttributeName) : [];
};

export const getWishlistItemSku = (product: WishlistItem): string => product?.product ? getProductId(product.product) : '';

export const getWishlistTotals = (wishlist: WishlistResponseData): AgnosticTotals => {
  if (!wishlist) {
    return {
      total: 0,
      subtotal: 0
    };
  }

  const getItemPrice = (item: WishlistItem) => {
    const itemPrice = getWishlistItemPrice(item);
    return itemPrice.special ?? itemPrice.regular;
  };

  const itemsPrice = wishlist.items.reduce((totalPrice, currItem) => totalPrice += getItemPrice(currItem), 0);

  return {
    total: itemsPrice,
    subtotal: itemsPrice
  };
};

export const getWishlistTotalItems = (wishlist: WishlistResponseData): number => wishlist?.items.length ?? 0;

const wishlistGetters: WishlistGetters<WishlistResponseData, WishlistItem> = {
  getTotals: getWishlistTotals,
  getItems: getWishlistItems,
  getItemName: getWishlistItemName,
  getItemImage: getWishlistItemImage,
  getItemPrice: getWishlistItemPrice,
  getItemAttributes: getWishlistItemAttributes,
  getItemSku: getWishlistItemSku,
  getTotalItems: getWishlistTotalItems,
  getFormattedPrice
};

export default wishlistGetters;
