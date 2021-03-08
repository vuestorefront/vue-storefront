import { AgnosticCoupon } from '@vue-storefront/core';

export { UseCategory, UseProduct } from '@vue-storefront/core';

export type Category = {
  id: number;
  name: string;
  slug: string;
  items: Category[];
}

export type CategoryFilter = Record<string, any>;

export type User = {
  firstName?: string;
  lastName?: string;
  email?: string;
};

export type UserAddress = Record<string, any>;

export type Coupon = AgnosticCoupon;

export type Order = Record<string, any>;

export type OrderItem = Record<string, any>;

export type OrdersResponse = {
  data: any[];
  total: number;
};

export type OrderSearchParams = Record<string, any>;

export type Product = {
  name: string;
};

export type ProductsResponse = {
  data: Product[];
  total: number;
};

export type CartItem = Product & {
  _count: number;
};

export type Cart = {
  coupons: AgnosticCoupon[];
  items: CartItem[];
};

export type Review = Record<string, any>;

export type Shipping = Record<string, unknown>;

export type ShippingMethod = Record<string, any>;

export type WishlistProduct = Record<string, any>;

export type Wishlist = Record<string, any>;

export type ProductVariant = {
  _id: number;
  _description: string;
  _categoriesRef: string[];
  name: string;
  sku: string;
  images: string[];
  price: {
    original: number;
    current: number;
  };
}
