import {
  WishlistGetters,
  AgnosticPrice,
  AgnosticTotals
} from '@vue-storefront/core';
import { WishlistItem, WishlistResponseData } from '@aboutyou/backbone/endpoints/wishlist/getWishlist';
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

// unavailable
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getWishlistItemQty = (product: WishlistItem): number => 1;

export const getWishlistItemAttributes = (product: WishlistItem, filterByAttributeName?: string[]) => {
  return product?.product ? getProductAttributes(product.product, filterByAttributeName) : [];
};

export const getWishlistItemSku = (product: WishlistItem): string => product?.product ? getProductId(product.product) : '';

// unavailable
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getWishlistTotals = (wishlist: WishlistItem): AgnosticTotals => ({ total: 0, subtotal: 0 });

// unavailable
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getWishlistShippingPrice = (wishlist: WishlistResponseData): number => 0;

export const getWishlistTotalItems = (wishlist: WishlistResponseData): number => wishlist?.items.length ?? 0;

const wishlistGetters: WishlistGetters<WishlistResponseData, WishlistItem> = {
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
