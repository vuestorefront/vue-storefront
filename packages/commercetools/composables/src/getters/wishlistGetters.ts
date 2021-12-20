/* istanbul ignore file */

import {
  WishlistGetters,
  AgnosticPrice,
  AgnosticTotals
} from '@vue-storefront/core';
import { ShoppingList, ShoppingListQueryResult } from '@vue-storefront/commercetools-api';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getWishlistItems = (wishlist: ShoppingListQueryResult): ShoppingList[] => [];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getWishlistItemName = (product: ShoppingList): string => '';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getWishlistItemImage = (product: ShoppingList): string => '';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getWishlistItemPrice = (product: ShoppingList): AgnosticPrice => ({ regular: 0, special: 0 });

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getWishlistItemQty = (product: ShoppingList): number => 1;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getWishlistItemAttributes = (product: ShoppingList, filterByAttributeName?: string[]) => ({'': ''});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getWishlistItemSku = (product: ShoppingList): string => '';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getWishlistTotals = (wishlist: ShoppingListQueryResult): AgnosticTotals => ({ total: 0, subtotal: 0 });

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getWishlistShippingPrice = (wishlist: ShoppingListQueryResult): number => 0;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getWishlistTotalItems = (wishlist: ShoppingListQueryResult): number => 0;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getFormattedPrice = (price: number): string => '';

/**
 * @remarks References:
 * {@link @vue-storefront/commercetools-api#ShoppingListQueryResult}, {@link @vue-storefront/commercetools-api#ShoppingList}
 */
const wishlistGetters: WishlistGetters<ShoppingListQueryResult, ShoppingList> = {
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
