/* istanbul ignore file */

import { Ref } from '@vue/composition-api';

export type ComputedProperty<T> = Readonly<Ref<Readonly<T>>>;

export type CustomQuery = <T>(query, variables) => T extends T ? T : ({ query; variables })

export interface SearchParams {
  perPage?: number;
  page?: number;
  sort?: any;
  term?: any;
  filters?: any;
  [x: string]: any;
}

export function Search(params: SearchParams): Promise<void>;
export function Search(params: SearchParams, customQuery: {}): Promise<void>
// Overloaded function type need declaration, as bellow
// https://www.typescriptlang.org/docs/handbook/functions.html#overloads
export function Search(params: SearchParams, customQuery?: {}): any {
  return { params, customQuery };
}

export interface UseProduct<PRODUCT, PRODUCT_FILTERS, SORTING_OPTIONS> {
  products: ComputedProperty<PRODUCT[]>;
  totalProducts: ComputedProperty<number>;
  loading: ComputedProperty<boolean>;
  search: typeof Search;
  [x: string]: any;
}

export interface UseUser
<
  USER,
  UPDATE_USER_PARAMS
> {
  user: ComputedProperty<USER>;
  updateUser: (params: UPDATE_USER_PARAMS) => Promise<void>;
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
    newPassword: string) => Promise<void>;
  refreshUser: () => Promise<void>;
  isAuthenticated: Ref<boolean>;
  loading: ComputedProperty<boolean>;
}

export interface UseUserOrders<ORDER> {
  orders: ComputedProperty<ORDER[]>;
  totalOrders: ComputedProperty<number>;
  searchOrders: typeof Search;
  loading: ComputedProperty<boolean>;
}

export interface UseUserAddress<ADDRESS> {
  addresses: ComputedProperty<ADDRESS[]>;
  totalAddresses: ComputedProperty<number>;
  addAddress: (address: ADDRESS) => Promise<void>;
  deleteAddress: (address: ADDRESS) => Promise<void>;
  updateAddress: (address: ADDRESS) => Promise<void>;
  searchAddresses: (params?: { [x: string]: any }) => Promise<void>;
  loading: ComputedProperty<boolean>;
}

export interface UseUserShipping<ADDRESS> {
  addresses: ComputedProperty<ADDRESS[]>;
  totalAddresses: ComputedProperty<number>;
  addAddress: (address: ADDRESS) => Promise<void>;
  deleteAddress: (address: ADDRESS) => Promise<void>;
  updateAddress: (address: ADDRESS) => Promise<void>;
  load: () => Promise<void>;
  defaultAddress: ComputedProperty<ADDRESS>;
  setDefault: (address: ADDRESS) => Promise<void>;
  loading: ComputedProperty<boolean>;
}

export interface UseUserBilling<ADDRESS> {
  addresses: ComputedProperty<ADDRESS[]>;
  totalAddresses: ComputedProperty<number>;
  addAddress: (address: ADDRESS) => Promise<void>;
  deleteAddress: (address: ADDRESS) => Promise<void>;
  updateAddress: (address: ADDRESS) => Promise<void>;
  load: () => Promise<void>;
  defaultAddress: ComputedProperty<ADDRESS>;
  setDefault: (address: ADDRESS) => Promise<void>;
  loading: ComputedProperty<boolean>;
}

export interface UseCategory
<
  CATEGORY
> {
  categories: ComputedProperty<CATEGORY[]>;
  search: typeof Search;
  loading: ComputedProperty<boolean>;
}

export function AddToCart<PRODUCT>(product: PRODUCT, quantity?: number): Promise<void>;
export function AddToCart<PRODUCT>(product: PRODUCT, quantity: number, customQuery: {}): Promise<void>
export function AddToCart<PRODUCT>(product: PRODUCT, quantity?: number, customQuery?: {}): any {
  return { product, quantity, customQuery };
}
export function RemoveFromCart<CART_ITEM>(product: CART_ITEM): Promise<void>
export function RemoveFromCart<CART_ITEM>(product: CART_ITEM, customQuery: {}): Promise<void>
export function RemoveFromCart<CART_ITEM>(product: CART_ITEM, customQuery?: {}): any {
  return { product, customQuery };
}
export function ApplyCoupon(coupon): Promise<void>
export function ApplyCoupon(coupon, customQuery: {}): Promise<void>
export function ApplyCoupon(coupon, customQuery?: {}): any {
  return { coupon, customQuery };
}
export function LoadCart(customQuery?: {}): Promise<void>
export function LoadCart(customQuery?: {}): any {
  return { customQuery };
}

export interface UseCart
<
  CART,
  CART_ITEM,
  PRODUCT,
  COUPON
  > {
  cart: ComputedProperty<CART>;
  addToCart: typeof AddToCart;
  isOnCart: (product: PRODUCT) => boolean;
  // eslint-disable-next-line @typescript-eslint/adjacent-overload-signatures
  removeFromCart: typeof RemoveFromCart;
  updateQuantity: typeof AddToCart;
  clearCart: () => Promise<void>;
  coupon: ComputedProperty<COUPON | null>;
  applyCoupon: typeof ApplyCoupon;
  removeCoupon: typeof LoadCart;
  loadCart: typeof LoadCart;
  loading: ComputedProperty<boolean>;
}

export interface UseWishlist
<
  WISHLIST,
  WISHLIST_ITEM,
  PRODUCT,
> {
  wishlist: ComputedProperty<WISHLIST>;
  addToWishlist: (product: PRODUCT) => Promise<void>;
  isOnWishlist: (product: PRODUCT) => boolean;
  removeFromWishlist: (product: WISHLIST_ITEM,) => Promise<void>;
  clearWishlist: () => Promise<void>;
  loadWishlist: () => Promise<void>;
  loading: ComputedProperty<boolean>;
}

export interface UseCompare<PRODUCT> {
  compare: ComputedProperty<PRODUCT[]>;
  addToCompare: (product: PRODUCT) => Promise<void>;
  removeFromCompare: (product: PRODUCT) => Promise<void>;
  clearCompare: () => Promise<void>;
  loading: ComputedProperty<boolean>;
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
  loading: ComputedProperty<boolean>;
}

export interface UseReview<REVIEW, REVIEWS_SEARCH_PARAMS, REVIEW_ADD_PARAMS> {
  search: (params?: REVIEWS_SEARCH_PARAMS) => Promise<void>;
  addReview: (params: REVIEW_ADD_PARAMS) => Promise<void>;
  reviews: ComputedProperty<REVIEW>;
  loading: ComputedProperty<boolean>;
  [x: string]: any;
}

export interface UseFacet<SEARCH_DATA> {
  result: ComputedProperty<FacetSearchResult<SEARCH_DATA>>;
  loading: ComputedProperty<boolean>;
  search: (params?: AgnosticFacetSearchParams) => Promise<void>;
}

export interface ProductGetters<PRODUCT, PRODUCT_FILTER> {
  getName: (product: PRODUCT) => string;
  getSlug: (product: PRODUCT) => string;
  getPrice: (product: PRODUCT) => AgnosticPrice;
  getGallery: (product: PRODUCT) => AgnosticMediaGalleryItem[];
  getCoverImage: (product: PRODUCT) => string;
  getFiltered: (products: PRODUCT[], filters?: PRODUCT_FILTER) =>
    PRODUCT[];
  getAttributes: (products: PRODUCT[] | PRODUCT, filters?: Array<string>) => Record<string, AgnosticAttribute | string>;
  getDescription: (product: PRODUCT) => string;
  getCategoryIds: (product: PRODUCT) => string[];
  getId: (product: PRODUCT) => string;
  getFormattedPrice: (price: number) => string;
  getBreadcrumbs?: (product: PRODUCT) => AgnosticBreadcrumb[];
  [getterName: string]: any;
}

export interface CartGetters<CART, CART_ITEM> {
  getItems: (cart: CART) => CART_ITEM[];
  getItemName: (cartItem: CART_ITEM) => string;
  getItemImage: (cartItem: CART_ITEM) => string;
  getItemPrice: (cartItem: CART_ITEM) => AgnosticPrice;
  getItemQty: (cartItem: CART_ITEM) => number;
  getItemAttributes: (cartItem: CART_ITEM, filters?: Array<string>) => Record<string, AgnosticAttribute | string>;
  getItemSku: (cartItem: CART_ITEM) => string;
  getTotals: (cart: CART) => AgnosticTotals;
  getShippingPrice: (cart: CART) => number;
  getTotalItems: (cart: CART) => number;
  getFormattedPrice: (price: number) => string;
  [getterName: string]: (element: any, options?: any) => unknown;
}

export interface WishlistGetters<WISHLIST, WISHLIST_ITEM> {
  getItems: (wishlist: WISHLIST) => WISHLIST_ITEM[];
  getItemName: (wishlistItem: WISHLIST_ITEM) => string;
  getItemImage: (wishlistItem: WISHLIST_ITEM) => string;
  getItemPrice: (wishlistItem: WISHLIST_ITEM) => AgnosticPrice;
  getItemAttributes: (wishlistItem: WISHLIST_ITEM, filters?: Array<string>) => Record<string, AgnosticAttribute | string>;
  getItemSku: (wishlistItem: WISHLIST_ITEM) => string;
  getTotals: (wishlist: WISHLIST) => AgnosticTotals;
  getTotalItems: (wishlist: WISHLIST) => number;
  getFormattedPrice: (price: number) => string;
  [getterName: string]: (element: any, options?: any) => unknown;
}

export interface CategoryGetters<CATEGORY> {
  getTree: (category: CATEGORY) => AgnosticCategoryTree | null;
  getBreadcrumbs?: (category: CATEGORY) => AgnosticBreadcrumb[];
  [getterName: string]: any;
}

export interface UserGetters<USER> {
  getFirstName: (customer: USER) => string;
  getLastName: (customer: USER) => string;
  getFullName: (customer: USER) => string;
  [getterName: string]: (element: any, options?: any) => unknown;
}

export interface CheckoutGetters<SHIPPING_METHOD> {
  getShippingMethodId: (shippingMethod: SHIPPING_METHOD) => string;
  getShippingMethodName: (shippingMethod: SHIPPING_METHOD) => string;
  getShippingMethodDescription: (shippingMethod: SHIPPING_METHOD) => string;
  getShippingMethodPrice: (shippingMethod: SHIPPING_METHOD) => number;
  getFormattedPrice: (price: number) => string;
  [getterName: string]: (element: any, options?: any) => unknown;
}

export interface UserOrderGetters<ORDER, ORDER_ITEM> {
  getDate: (order: ORDER) => string;
  getId: (order: ORDER) => string;
  getStatus: (order: ORDER) => string;
  getPrice: (order: ORDER) => number;
  getItems: (order: ORDER) => ORDER_ITEM[];
  getItemSku: (item: ORDER_ITEM) => string;
  getItemName: (item: ORDER_ITEM) => string;
  getItemQty: (item: ORDER_ITEM) => number;
  getFormattedPrice: (price: number) => string;
  [getterName: string]: (element: any, options?: any) => unknown;
}

export interface ReviewGetters<REVIEW, REVIEW_ITEM> {
  getItems: (review: REVIEW) => REVIEW_ITEM[];
  getReviewId: (item: REVIEW_ITEM) => string;
  getReviewAuthor: (item: REVIEW_ITEM) => string;
  getReviewMessage: (item: REVIEW_ITEM) => string;
  getReviewRating: (item: REVIEW_ITEM) => number;
  getReviewDate: (item: REVIEW_ITEM) => string;
  getTotalReviews: (review: REVIEW) => number;
  getAverageRating: (review: REVIEW) => number;
  getRatesCount: (review: REVIEW) => AgnosticRateCount[];
  getReviewsPage: (review: REVIEW) => number;
}

export interface FacetsGetters<SEARCH_DATA, RESULTS, CRITERIA = any> {
  getAll: (searchData: FacetSearchResult<SEARCH_DATA>, criteria?: CRITERIA) => AgnosticFacet[];
  getGrouped: (searchData: FacetSearchResult<SEARCH_DATA>, criteria?: CRITERIA) => AgnosticGroupedFacet[];
  getCategoryTree: (searchData: FacetSearchResult<SEARCH_DATA>) => AgnosticCategoryTree;
  getSortOptions: (searchData: FacetSearchResult<SEARCH_DATA>) => AgnosticSort;
  getProducts: (searchData: FacetSearchResult<SEARCH_DATA>) => RESULTS;
  getPagination: (searchData: FacetSearchResult<SEARCH_DATA>) => AgnosticPagination;
  getBreadcrumbs: (searchData: FacetSearchResult<SEARCH_DATA>) => AgnosticBreadcrumb[];
  [getterName: string]: (element: any, options?: any) => unknown;
}

export interface AgnosticMediaGalleryItem {
  small: string;
  normal: string;
  big: string;
}

export interface AgnosticCategoryTree {
  label: string;
  slug?: string;
  items: AgnosticCategoryTree[];
  isCurrent: boolean;
  [x: string]: unknown;
}

export interface AgnosticPrice {
  regular: number | null;
  special?: number | null;
}

export interface AgnosticTotals {
  total: number;
  subtotal: number;
  [x: string]: unknown;
}

export interface AgnosticAttribute {
  name?: string;
  value: string | Record<string, any>;
  label: string;
}

export interface AgnosticProductReview {
  id: string;
  author: string;
  date: Date;
  message: string | null;
  rating: number | null;
}

export interface AgnosticLocale {
  code: string;
  label: string;
  [x: string]: unknown;
}

export interface AgnosticCountry {
  code: string;
  label: string;
  [x: string]: unknown;
}

export interface AgnosticCurrency {
  code: string;
  label: string;
  prefixSign: boolean;
  sign: string;
  [x: string]: unknown;
}

export interface AgnosticBreadcrumb {
  text: string;
  link: string;
}

export interface AgnosticSortByOption {
  label: string;
  value: string;
  [x: string]: unknown;
}

export interface AgnosticRateCount {
  rate: number;
  count: number;
}

// TODO - remove this interface
export enum AgnosticOrderStatus {
  Open = 'Open',
  Pending = 'Pending',
  Confirmed = 'Confirmed',
  Shipped = 'Shipped',
  Complete = 'Complete',
  Cancelled = 'Cancelled',
  Refunded = 'Refunded'
}

export interface AgnosticFacet {
  type: string;
  id: string;
  value: any;
  attrName?: string;
  count?: number;
  selected?: boolean;
  metadata?: any;
}

export interface AgnosticGroupedFacet {
  id: string;
  label: string;
  count?: number;
  options: AgnosticFacet[];
}

export interface AgnosticSort {
  options: AgnosticFacet[];
  selected: string;
}

export interface AgnosticPagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  pageOptions: number[];
}

export interface FacetSearchResult<S> {
  data: S;
  input: AgnosticFacetSearchParams;
}

export interface AgnosticFacetSearchParams {
  categorySlug?: string;
  page?: number;
  itemsPerPage?: number;
  sort?: string;
  filters?: Record<string, string[]>;
  metadata?: any;
  [x: string]: any;
}

export interface AgnosticLogger {
  debug(message?: any, ...args: any): void;
  info(message?: any, ...args: any): void;
  warn(message?: any, ...args: any): void;
  error(message?: any, ...args: any): void;
  verbosity: string;
}
