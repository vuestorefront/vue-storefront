import { UseCategory, UseProduct } from '@vue-storefront/core';
import { ComputedProperty } from '@vue-storefront/core';

// @todo: replace with real types

type Product = {

}

type Category = {

}

type User = {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  displayName?: string;
  token?: string;
  error?: string;
}

type UserAddress = {
}

// @todo: replace with real Cart types
type Cart = {
  id?: string;
}

type CartItem = {

}

type Coupon = {

}

type Order = {}

type OrderItem = {}

type OrderSearchParams = {

}

type ShippingMethod = {

}

type WishlistProduct = {

}

type Wishlist = {

}

export interface UseSearch<SEARCH_RESULTS, SEARCH_PARAMS> {
  search: (searchParams: SEARCH_PARAMS) => Promise<void>;
  searchResults: ComputedProperty<SEARCH_RESULTS>;
  loading: ComputedProperty<boolean>;
}

export interface SearchResults {
  brands: {
    id: number;
    label: string;
    value: string;
  }[];
  categories: Category[];
  products: Product[];
  suggestions: AgnosticSuggestion[];
}

export type AgnosticSuggestion = {
  value: string;
  [x: string]: any;
}

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
