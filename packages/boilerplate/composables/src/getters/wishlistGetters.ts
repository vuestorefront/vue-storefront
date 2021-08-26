import {
  WishlistGetters,
  AgnosticAttribute,
  AgnosticPrice,
  AgnosticTotals
} from '@vue-storefront/core';
import type { Wishlist, WishlistItem } from '@vue-storefront/boilerplate-api';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getItems(wishlist: Wishlist): WishlistItem[] {
  return [];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getTotals(wishlist: Wishlist): AgnosticTotals {
  return {
    total: 10,
    subtotal: 10
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getItemName(item: WishlistItem): string {
  return '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getItemImage(item: WishlistItem): string {
  return '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getItemPrice(item: WishlistItem): AgnosticPrice {
  return {
    regular: 12,
    special: 10
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getItemQty(item: WishlistItem): number {
  return 1;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getItemAttributes(item: WishlistItem, filters?: string[]): Record<string, AgnosticAttribute | string> {
  return {
    color: 'red'
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getItemSku(item: WishlistItem): string {
  return '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getShippingPrice(wishlist: Wishlist): number {
  return 0;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getTotalItems(wishlist: Wishlist): number {
  return 1;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getFormattedPrice(price: number): string {
  return '';
}

export const wishlistGetters: WishlistGetters<Wishlist, WishlistItem> = {
  getItems,
  getTotals,
  getItemName,
  getItemImage,
  getItemPrice,
  getItemQty,
  getItemAttributes,
  getShippingPrice,
  getItemSku,
  getTotalItems,
  getFormattedPrice
};
