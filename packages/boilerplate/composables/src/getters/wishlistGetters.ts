import {
  WishlistGetters,
  AgnosticPrice,
  AgnosticTotals
} from '@vue-storefront/core';
import { Wishlist, WishlistProduct } from '../types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getWishlistItems = (wishlist: Wishlist): WishlistProduct[] => [
  {
    _id: 1,
    _description: 'Some description',
    _categoriesRef: [
      '1',
      '2'
    ],
    name: 'Black jacket',
    sku: 'black-jacket',
    images: [
      'https://s3-eu-west-1.amazonaws.com/commercetools-maximilian/products/081223_1_large.jpg'
    ],
    price: {
      original: 12.34,
      current: 10.00
    },
    qty: 1
  }
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getWishlistItemName = (product: any): string => product?.name || 'Product\'s name';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getWishlistItemImage = (product: any): string => product?.images[0] || 'https://s3-eu-west-1.amazonaws.com/commercetools-maximilian/products/081223_1_large.jpg';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getWishlistItemPrice = (product: any): AgnosticPrice => {
  return {
    regular: product?.price?.original || 12,
    special: product?.price?.current || 10
  };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getWishlistItemQty = (product: WishlistProduct): number => 1;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getWishlistItemAttributes = (product: WishlistProduct, filterByAttributeName?: string[]) => ({ color: 'red' });

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getWishlistItemSku = (product: any): string => product?.sku || 'some-sku';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getWishlistTotals = (wishlist: Wishlist): AgnosticTotals => {
  return {
    total: 10,
    subtotal: 10
  };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getWishlistShippingPrice = (wishlist: Wishlist): number => 0;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getWishlistTotalItems = (wishlist: Wishlist): number => 1;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getFormattedPrice = (price: number): string => String(price);

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
