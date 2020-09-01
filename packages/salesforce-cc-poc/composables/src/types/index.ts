import { UseCategory, UseProduct } from '@vue-storefront/core';

import { Product } from '@vue-storefront/salesforce-cc-poc-api/src/types';
import { Cart, CartItem } from '@vue-storefront/salesforce-cc-poc-api/lib/types';

type Category = {}
type User = {}
type UserAddress = {}
type Coupon = {}
type Order = {}
type OrderItem = {}
type OrderSearchParams = {}
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
  ShippingMethod,
  User,
  UserAddress,
  Wishlist,
  WishlistProduct,
  UseCategory,
  UseProduct
};
