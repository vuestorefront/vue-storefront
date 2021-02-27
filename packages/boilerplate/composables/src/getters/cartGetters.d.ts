import { CartGetters, AgnosticPrice, AgnosticTotals, AgnosticCoupon, AgnosticDiscount } from '@vue-storefront/core';
import { Cart, LineItem } from '@vue-storefront/boilerplate-api/src/types';
export declare const getCartItems: (cart: Cart) => LineItem[];
export declare const getCartItemName: (product: any) => string;
export declare const getCartItemImage: (product: any) => string;
export declare const getCartItemPrice: (product: any) => AgnosticPrice;
export declare const getCartItemQty: (product: LineItem) => number;
export declare const getCartItemAttributes: (product: LineItem, filterByAttributeName?: Array<string>) => {
    color: string;
};
export declare const getCartItemSku: (product: any) => string;
export declare const getCartTotals: (cart: Cart) => AgnosticTotals;
export declare const getCartShippingPrice: (cart: Cart) => number;
export declare const getCartTotalItems: (cart: Cart) => number;
export declare const getFormattedPrice: (price: number) => string;
export declare const getCoupons: (cart: Cart) => AgnosticCoupon[];
export declare const getDiscounts: (cart: Cart) => AgnosticDiscount[];
declare const cartGetters: CartGetters<Cart, LineItem>;
export default cartGetters;
