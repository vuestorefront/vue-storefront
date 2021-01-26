import { CartGetters, AgnosticPrice, AgnosticTotals, AgnosticDiscount, AgnosticCoupon } from '@vue-storefront/core';

import { CartType, LineItemType, Product  } from '@vue-storefront/virtocommerce-api';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCartItems = (cart: CartType): LineItemType[] => cart.items;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCartItemName = (product: LineItemType): string => product?.name || 'Product\'s name';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCartItemImage = (product: LineItemType): string => product?.imageUrl;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCartItemPrice = (product: LineItemType): AgnosticPrice => {
  return {
    regular: product?.listPrice?.amount,
    special: product?.listPrice?.amount
  };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCartItemQty = (product: LineItemType): number => product.quantity;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCartItemAttributes = (product: LineItemType, filterByAttributeName?: Array<string>) => ({ color: 'red' });

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCartItemSku = (product: any): string => product?.sku || 'some-sku';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCartTotals = (cart: CartType): AgnosticTotals => {
  if (!cart) {
    return {
      total: 0,
      subtotal: 0,
      special: 0
    };
  }
  return {
    total: cart.total.amount,
    subtotal: cart.subTotal.amount
  };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCartShippingPrice = (cart: CartType): number => 0;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCartTotalItems = (cart: CartType): number => !cart ? 0 : cart.itemsCount;

export const getFormattedPrice = (price: number) => String(price);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCoupons = (cart: CartType): AgnosticCoupon[] => [];

export const getDiscounts = (cart: CartType): AgnosticDiscount[] => {
  return [];
};

const cartGetters: CartGetters<CartType, LineItemType> = {
  getTotals: getCartTotals,
  getShippingPrice: getCartShippingPrice,
  getItems: getCartItems,
  getItemName: getCartItemName,
  getItemImage: getCartItemImage,
  getItemPrice: getCartItemPrice,
  getItemQty: getCartItemQty,
  getItemAttributes: getCartItemAttributes,
  getItemSku: getCartItemSku,
  getFormattedPrice: getFormattedPrice,
  getTotalItems: getCartTotalItems,
  getCoupons,
  getDiscounts
};

export default cartGetters;
