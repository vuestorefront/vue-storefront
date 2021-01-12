import { CartGetters, AgnosticPrice, AgnosticTotals, AgnosticCoupon, AgnosticDiscount } from '@vue-storefront/core';
import { Cart, LineItem } from '@vue-storefront/boilerplate-api/src/types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCartItems = (cart: Cart): LineItem[] => [
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
export const getCartItemName = (product: any): string => product?.name || 'Product\'s name';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCartItemImage = (product: any): string => product?.images[0] || 'https://s3-eu-west-1.amazonaws.com/commercetools-maximilian/products/081223_1_large.jpg';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCartItemPrice = (product: any): AgnosticPrice => {
  return {
    regular: product?.price?.original || 12,
    special: product?.price?.current || 10
  };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCartItemQty = (product: LineItem): number => 1;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCartItemAttributes = (product: LineItem, filterByAttributeName?: Array<string>) => ({ color: 'red' });

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCartItemSku = (product: any): string => product?.sku || 'some-sku';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCartTotals = (cart: Cart): AgnosticTotals => {
  return {
    total: 10,
    subtotal: 10
  };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCartShippingPrice = (cart: Cart): number => 0;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCartTotalItems = (cart: Cart): number => 1;

export const getFormattedPrice = (price: number) => String(price);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCoupons = (cart: Cart): AgnosticCoupon[] => [];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getDiscounts = (cart: Cart): AgnosticDiscount[] => [];

const cartGetters: CartGetters<Cart, LineItem> = {
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
