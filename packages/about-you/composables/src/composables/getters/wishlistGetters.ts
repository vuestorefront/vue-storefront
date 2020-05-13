import { AgnosticTotals, AgnosticPrice } from '@vue-storefront/core';
import { BapiWishlistProduct, BapiWishlist } from '../../types';
import { getProductName, getProductCoverImage, getProductPrice } from './productGetters';

export const getWishlistItems = wishlist => {
  return wishlist ? wishlist.items : [];
};

export const getWishlistItemName = (item: BapiWishlistProduct): string => {
  return getProductName(item.product);
};

export const getWishlistItemImage = (item: BapiWishlistProduct): string => {
  return getProductCoverImage(item.product);
};

export const getWishlistItemPrice = (item: BapiWishlistProduct): AgnosticPrice => {
  return getProductPrice(item.product);
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getWishlistItemQty = (item: BapiWishlistProduct): number => {
  return null;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getWishlistItemAttributes = (wishlist: BapiWishlist) => undefined;

export const getWishlistItemSku = (item: BapiWishlistProduct): string => item?.product ? item.product.id.toString() : '';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getWishlistTotals = (wishlist: BapiWishlist): AgnosticTotals => {
  return {
    total: 0,
    subtotal: 0
  };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getWishlistShippingPrice = (wishlist: BapiWishlist): number => {
  return null;
};

export const getWishlistTotalItems = (wishlist: BapiWishlist): number => {
  return wishlist?.items ? wishlist.items.length : 0;
};

export const getFormattedPrice = (price: number) => price ? `${price}€` : '0€';

const wishlistGetters = {
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
