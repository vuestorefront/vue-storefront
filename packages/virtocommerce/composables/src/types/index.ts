import { UseCategory, UseProduct } from '@vue-storefront/core';

export type ProductsResponse = {
  data: Product[];
  total: number;
};

export type OrdersResponse = {
  data: any[];
  total: number;
};

export interface ProductsSearchParams {
  perPage?: number;
  page?: number;
  sort?: any;
  term?: any; 
  catId?: string | string[];
  limit?: number;
  skus?: string[];
  slug?: string;
  id?: string;
}

type Product = {}
type Category = {}
type User = {
  firstName?: string;
  lastName?: string;
  email?: string;
}
type UserAddress = {}
type Cart = {}
type CartItem = {}
type Coupon = {}
type Order = {}
type OrderItem = {}
type OrderSearchParams = {}
type Review = {};
type ShippingMethod = {}
type WishlistProduct = {}
type Wishlist = {}

export {
  Cart,
  CartItem,
  Category,
  Coupon,
  Order,
  OrderItem,
  OrderSearchParams,
  Product,
  Review,
  ShippingMethod,
  User,
  UserAddress,
  Wishlist,
  WishlistProduct,
  UseCategory, 
  UseProduct
};
