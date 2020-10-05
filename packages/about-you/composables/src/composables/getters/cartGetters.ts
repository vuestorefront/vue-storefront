import { CartGetters, AgnosticPrice, AgnosticTotals, AgnosticCoupon } from '@vue-storefront/core';
import { BasketResponseData, BasketItem } from '../../types';
import {
  getProductCoverImage,
  getProductName,
  getProductPrice,
  getFormattedPrice,
  getProductId,
  getProductAttributes
} from './productGetters';

export const getCartItems = (cart: BasketResponseData): BasketItem[] => cart?.items ?? [];

export const getCartItemName = (product: BasketItem): string => product?.product ? getProductName(product.product) : '';

export const getCartItemImage = (product: BasketItem): string => product?.product ? getProductCoverImage(product.product) : '';

export const getCartItemPrice = (product: BasketItem): AgnosticPrice => product?.product ? getProductPrice(product.product) : {
  regular: 0,
  special: 0
};

export const getCartItemQty = (product: BasketItem): number => product?.quantity ?? 0;

export const getCartItemAttributes = (product: BasketItem, filterByAttributeName?: string[]) => {
  return product?.product ? getProductAttributes(product.product, filterByAttributeName) : {};
};

export const getCartItemSku = (product: BasketItem): string => product?.product ? getProductId(product.product) : '';

export const getCartTotals = (cart: BasketResponseData): AgnosticTotals => {
  return cart?.cost ? {
    total: cart.cost.withTax / 100,
    subtotal: cart.cost.withoutTax / 100
  } : {
    total: 0,
    subtotal: 0
  };
};

// unavailable
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCartShippingPrice = (cart: BasketResponseData): number => 0;

export const getCartTotalItems = (cart: BasketResponseData): number => cart?.items.reduce((previous, current) => previous + current.quantity, 0) ?? 0;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCoupons = (cart: BasketResponseData): AgnosticCoupon[] => [];

const cartGetters: CartGetters<BasketResponseData, BasketItem> = {
  getTotals: getCartTotals,
  getShippingPrice: getCartShippingPrice,
  getItems: getCartItems,
  getItemName: getCartItemName,
  getItemImage: getCartItemImage,
  getItemPrice: getCartItemPrice,
  getItemQty: getCartItemQty,
  getItemAttributes: getCartItemAttributes,
  getItemSku: getCartItemSku,
  getTotalItems: getCartTotalItems,
  getFormattedPrice,
  getCoupons
};

export default cartGetters;
