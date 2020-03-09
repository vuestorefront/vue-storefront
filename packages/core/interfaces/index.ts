import { Ref } from '@vue/composition-api';

export interface UseProduct<PRODUCT> {
  products: Readonly<Ref<Readonly<Array<PRODUCT>>>>;
  search: (params: {
    slug?: string;
    [x: string]: any;
  }) => Promise<void>;
  loading: Ref<boolean>;
  error: Ref<any>;
  [x: string]: any;
}

export interface UseUser
<
  USER
> {
  user: Readonly<Ref<Readonly<USER>>>;
  register: (user: {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    [x: string]: any;
  }) => Promise<void>;
  login: (user: {
    username: string;
    password: string;
    [x: string]: any;
  }) => Promise<void>;
  logout: () => Promise<void>;
  changePassword: (
    currentPassword: string,
    newPassword: string
  ) => Promise<void>;
  isAuthenticated: Ref<boolean>;
  loading: Ref<boolean>;
  error: Ref<any>;
}

export interface UseCategory
<
  CATEGORY,
  APPLIED_FILTERS,
  APPLY_FILTER,
> {
  categories: Readonly<Ref<Readonly<Array<CATEGORY>>>>;
  search: (params: {
    slug?: string;
    [x: string]: any;
  }) => Promise<void>;
  appliedFilters: APPLIED_FILTERS;
  applyFilter: APPLY_FILTER;
  clearFilters: () => Promise<void> | void;
  loading: Ref<boolean>;
  error: Ref<any>;
}

export interface UseCart
<
  CART,
  PRODUCT,
  CART_PRODUCT,
  COUPON
> {
  cart: Readonly<Ref<Readonly<CART>>>;
  addToCart: (product: PRODUCT, quantity: number) => Promise<void>;
  removeFromCart: (product: CART_PRODUCT, quantity?: number) => Promise<void>;
  clearCart: () => Promise<void> | void;
  coupon: Readonly<Ref<Readonly<COUPON>>>;
  applyCoupon: (coupon: string) => Promise<void> | void;
  removeCoupon: () => Promise<void> | void;
  loading: Ref<boolean>;
  error: any;
}

export interface UseWishlist
<
  WISHLIST,
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
  CLEAR_WISHLIST,
> {
  wishlist: WISHLIST;
  addToWishlist: ADD_TO_WISHLIST;
  removeFromWishlist: REMOVE_FROM_WISHLIST;
  clearWishlist: CLEAR_WISHLIST;
  loading: Ref<boolean>;
  error: any;
}

export interface UseCompare
<
  COMPARE,
  ADD_TO_COMPARE,
  REMOVE_FROM_COMPARE,
  CLEAR_COMPARE,
> {
  compare: COMPARE;
  addToCompare: ADD_TO_COMPARE;
  removeFromCompare: REMOVE_FROM_COMPARE;
  clearCompare: CLEAR_COMPARE;
  loading: boolean;
  error: any;
}

export interface UseCheckout
<
  PAYMENT_METHODS,
  SHIPPING_METHODS,
  PERSONAL_DETAILS,
  SHIPPING_DETAILS,
  BILLING_DETAILS,
  CHOOSEN_PAYMENT_METHOD,
  CHOOSEN_SHIPPING_METHOD,
  PLACE_ORDER,
> {
  paymentMethods: Ref<PAYMENT_METHODS>;
  shippingMethods: Ref<SHIPPING_METHODS>;
  personalDetails: PERSONAL_DETAILS;
  shippingDetails: SHIPPING_DETAILS;
  billingDetails: BILLING_DETAILS;
  chosenPaymentMethod: CHOOSEN_PAYMENT_METHOD;
  chosenShippingMethod: CHOOSEN_SHIPPING_METHOD;
  placeOrder: PLACE_ORDER;
  loading: Ref<boolean>;
  error: any;
}

export interface UseLocale
<
  LOCALE,
  COUNTRY,
  CURRENCY,
  AVAILABLE_LOCALES,
  AVAILABLE_COUNTRIES,
  AVAILABLE_CURRENCIES,
> {
  locale: LOCALE;
  country: COUNTRY;
  currency: CURRENCY;
  availableLocales: AVAILABLE_LOCALES;
  availableCountries: AVAILABLE_COUNTRIES;
  availableCurrencies: AVAILABLE_CURRENCIES;
  loading: Ref<boolean>;
  error: any;
}

export interface UseContent<CONTENT, SEARCH> {
  content: CONTENT;
  search: SEARCH;
  loading: boolean;
  error: any;
}

export interface UiMediaGalleryItem {
  small: string;
  normal: string;
  big: string;
}

export interface UiCategory {
  label: string;
  slug?: string;
  items: UiCategory[];
}

export interface UiCartProductPrice {
  regular: number;
  special?: number;
}

export interface AgnosticTotals {
  total: number;
  subtotal: number;
}

export interface AgnosticProductAttribute {
  name?: string;
  value: string | Record<string, any>;
  label: string;
}
