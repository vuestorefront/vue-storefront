export { UseCategory, UseProduct } from '@vue-storefront/core';

export type ProductsResponse = {
  data: Product[];
  total: number;
};

export type OrdersResponse = {
  data: any[];
  total: number;
};

export type OrderSearchParams = Record<string, any>;

export type Category = {};

export type User = {
  firstName?: string;
  lastName?: string;
  email?: string;
};

export type UserAddress = {};

export type Cart = {};

export type CartItem = {};

export type Coupon = {};

export type Order = {};

export type OrderItem = {};

export type Product = {};

export type Review = {};

export type ShippingMethod = {};

export type WishlistProduct = {};

export type Wishlist = {};
