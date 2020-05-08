import { AgnosticTotals } from '@vue-storefront/core';
import { BapiWishlistProduct, BapiWishlist } from '../../types';
import { getProductName, getProductCoverImage, getProductPrice } from './productGetters';

export const getWishlistItems = wishlist => {
  return wishlist.items;
};

export const getWishlistItemName = (item: BapiWishlistProduct): string => {
  return getProductName(item.product);
};

export const getWishlistItemImage = (item: BapiWishlistProduct): string => {
  return getProductCoverImage(item.product);
};

export const getWishlistItemPrice = (item: BapiWishlistProduct): string => {
  return getProductPrice(item.product).regular.toString();
};

export const getWishlistItemQty = (item: BapiWishlistProduct): number => {
  return item.product?.id;
};

export const getWishlistItemAttributes = () => undefined;

export const getWishlistItemSku = (item: BapiWishlistProduct): string => item.product?.id.toString();

export const getWishlistTotals = (wishlist: BapiWishlist): AgnosticTotals => {
  return {
    total: wishlist.items.length,
    subtotal: wishlist.items.length
  };
};

export const getWishlistShippingPrice = (wishlist: BapiWishlist): number => {
  return wishlist.items.length;
};

export const getWishlistTotalItems = (wishlist: BapiWishlist): number => {
  return wishlist.items.length;
};

export const getFormattedPrice = (price: number) => `${price}$`;

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
