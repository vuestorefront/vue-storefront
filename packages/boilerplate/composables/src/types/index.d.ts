export { UseCategory, UseProduct } from '@vue-storefront/core';
export declare type ProductsResponse = {
    data: Product[];
    total: number;
};
export declare type OrdersResponse = {
    data: any[];
    total: number;
};
export declare type OrderSearchParams = Record<string, any>;
export declare type Category = {};
export declare type User = {
    firstName?: string;
    lastName?: string;
    email?: string;
};
export declare type UserAddress = {};
export declare type Cart = {};
export declare type CartItem = {};
export declare type Coupon = {};
export declare type Order = {};
export declare type OrderItem = {};
export declare type Product = {};
export declare type Review = {};
export declare type ShippingMethod = {};
export declare type WishlistProduct = {};
export declare type Wishlist = {};
