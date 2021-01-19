/* istanbul ignore file */

import { Ref } from '@vue/composition-api';
import type { Request, Response } from 'express';

export type ComputedProperty<T> = Readonly<Ref<Readonly<T>>>;

export type ComposableFunctionArgs <T> = T & { customQuery?: CustomQuery }

export type CustomQuery<T = any> = (query: any, variables: T) => {
  query?: any;
  variables?: T;
};

export interface ProductsSearchParams {
  perPage?: number;
  page?: number;
  sort?: any;
  term?: any;
  filters?: any;
  [x: string]: any;
}
export interface UseProductErrors {
  search?: Error;
}
export interface UseProduct<PRODUCTS, PRODUCT_SEARCH_PARAMS> {
  products: ComputedProperty<PRODUCTS>;
  loading: ComputedProperty<boolean>;
  error: ComputedProperty<UseProductErrors>;
  search(params: ComposableFunctionArgs<PRODUCT_SEARCH_PARAMS>): Promise<void>;
  [x: string]: any;
}

export interface UseUserRegisterParams {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  [x: string]: any;
}

export interface UseUserLoginParams {
  username: string;
  password: string;
  [x: string]: any;
}
export interface UseUserErrors {
  updateUser?: Error;
  register?: Error;
  login?: Error;
  logout?: Error;
  changePassword?: Error;
  load?: Error;
}
export interface UseUser
<
  USER,
  UPDATE_USER_PARAMS
> {
  user: ComputedProperty<USER>;
  setUser: (user: USER) => void;
  updateUser: (params: { user: UPDATE_USER_PARAMS }) => Promise<void>;
  register: (params: { user: UseUserRegisterParams }) => Promise<void>;
  login: (params: { user: UseUserLoginParams }) => Promise<void>;
  logout: () => Promise<void>;
  changePassword: (params: { current: string; new: string }) => Promise<void>;
  load: () => Promise<void>;
  isAuthenticated: Ref<boolean>;
  loading: ComputedProperty<boolean>;
  error: ComputedProperty<UseUserErrors>;
}

export interface UseUserOrdersSearchParams {
  id?: any;
  page?: number;
  perPage?: number;
  [x: string]: any;
}
export interface UseUserOrdersErrors {
  search?: Error;
}
export interface UseUserOrders<ORDERS, ORDER_SEARCH_PARAMS> {
  orders: ComputedProperty<ORDERS>;
  search(params: ComposableFunctionArgs<ORDER_SEARCH_PARAMS>): Promise<void>;
  loading: ComputedProperty<boolean>;
  error: ComputedProperty<UseUserOrdersErrors>;
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
export interface UseUserShippingErrors {
  addAddress?: Error;
  deleteAddress?: Error;
  updateAddress?: Error;
  load?: Error;
  setDefaultAddress?: Error;
}
export interface UseUserShipping<USER_SHIPPING, USER_SHIPPING_ITEM> {
  shipping: ComputedProperty<USER_SHIPPING>;
  addAddress: (params: { address: USER_SHIPPING_ITEM }) => Promise<void>;
  deleteAddress: (params: { address: USER_SHIPPING_ITEM }) => Promise<void>;
  updateAddress: (params: { address: USER_SHIPPING_ITEM }) => Promise<void>;
  load: () => Promise<void>;
  setDefaultAddress: (params: { address: USER_SHIPPING_ITEM }) => Promise<void>;
  loading: ComputedProperty<boolean>;
  error: ComputedProperty<UseUserShippingErrors>;
}

export interface UserShippingGetters<USER_SHIPPING, USER_SHIPPING_ITEM> {
  getAddresses: (shipping: USER_SHIPPING, criteria?: Record<string, any>) => USER_SHIPPING_ITEM[];
  getDefault: (shipping: USER_SHIPPING) => USER_SHIPPING_ITEM;
  getTotal: (shipping: USER_SHIPPING) => number;
  getPostCode: (address: USER_SHIPPING_ITEM) => string;
  getStreetName: (address: USER_SHIPPING_ITEM) => string;
  getStreetNumber: (address: USER_SHIPPING_ITEM) => string | number;
  getCity: (address: USER_SHIPPING_ITEM) => string;
  getFirstName: (address: USER_SHIPPING_ITEM) => string;
  getLastName: (address: USER_SHIPPING_ITEM) => string;
  getCountry: (address: USER_SHIPPING_ITEM) => string;
  getPhone: (address: USER_SHIPPING_ITEM) => string;
  getEmail: (address: USER_SHIPPING_ITEM) => string;
  getProvince: (address: USER_SHIPPING_ITEM) => string;
  getCompanyName: (address: USER_SHIPPING_ITEM) => string;
  getTaxNumber: (address: USER_SHIPPING_ITEM) => string;
  getId: (address: USER_SHIPPING_ITEM) => string | number;
  getApartmentNumber: (address: USER_SHIPPING_ITEM) => string | number;
  isDefault: (address: USER_SHIPPING_ITEM) => boolean;
}

export interface UseUserBillingErrors {
  addAddress?: Error;
  deleteAddress?: Error;
  updateAddress?: Error;
  load?: Error;
  setDefaultAddress?: Error;
}
export interface UseUserBilling<USER_BILLING, USER_BILLING_ITEM> {
  billing: ComputedProperty<USER_BILLING>;
  addAddress: (params: { address: USER_BILLING_ITEM }) => Promise<void>;
  deleteAddress: (params: { address: USER_BILLING_ITEM }) => Promise<void>;
  updateAddress: (params: { address: USER_BILLING_ITEM }) => Promise<void>;
  load: () => Promise<void>;
  setDefaultAddress: (params: { address: USER_BILLING_ITEM }) => Promise<void>;
  loading: ComputedProperty<boolean>;
  error: ComputedProperty<UseUserBillingErrors>;
}

export interface UserBillingGetters<USER_BILLING, USER_BILLING_ITEM> {
  getAddresses: (billing: USER_BILLING, criteria?: Record<string, any>) => USER_BILLING_ITEM[];
  getDefault: (billing: USER_BILLING) => USER_BILLING_ITEM;
  getTotal: (billing: USER_BILLING) => number;
  getPostCode: (address: USER_BILLING_ITEM) => string;
  getStreetName: (address: USER_BILLING_ITEM) => string;
  getStreetNumber: (address: USER_BILLING_ITEM) => string | number;
  getCity: (address: USER_BILLING_ITEM) => string;
  getFirstName: (address: USER_BILLING_ITEM) => string;
  getLastName: (address: USER_BILLING_ITEM) => string;
  getCountry: (address: USER_BILLING_ITEM) => string;
  getPhone: (address: USER_BILLING_ITEM) => string;
  getEmail: (address: USER_BILLING_ITEM) => string;
  getProvince: (address: USER_BILLING_ITEM) => string;
  getCompanyName: (address: USER_BILLING_ITEM) => string;
  getTaxNumber: (address: USER_BILLING_ITEM) => string;
  getId: (address: USER_BILLING_ITEM) => string;
  getApartmentNumber: (address: USER_BILLING_ITEM) => string | number;
  isDefault: (address: USER_BILLING_ITEM) => boolean;
}

export interface UseCategoryErrors {
  search?: Error;
}
export interface UseCategory<CATEGORY, CATEGORY_SEARCH_PARAMS> {
  categories: ComputedProperty<CATEGORY[]>;
  search(params: ComposableFunctionArgs<CATEGORY_SEARCH_PARAMS>): Promise<void>;
  loading: ComputedProperty<boolean>;
  error: ComputedProperty<UseCategoryErrors>;
}

export interface UseCartErrors {
  addItem?: Error;
  removeItem?: Error;
  updateItemQty?: Error;
  load?: Error;
  clear?: Error;
  applyCoupon: Error;
  removeCoupon?: Error;
}
export interface UseCart
<
  CART,
  CART_ITEM,
  PRODUCT,
  COUPON
  > {
  cart: ComputedProperty<CART>;
  setCart(cart: CART): void;
  addItem(params: { product: PRODUCT; quantity: number; customQuery?: CustomQuery }): Promise<void>;
  isOnCart: ({ product: PRODUCT }) => boolean;
  removeItem(params: { product: CART_ITEM; customQuery?: CustomQuery }): Promise<void>;
  updateItemQty(params: { product: CART_ITEM; quantity?: number; customQuery?: CustomQuery }): Promise<void>;
  clear(): Promise<void>;
  applyCoupon(params: { couponCode: string; customQuery?: CustomQuery }): Promise<void>;
  removeCoupon(params: { coupon: COUPON; customQuery?: CustomQuery }): Promise<void>;
  load(): Promise<void>;
  load(params: { customQuery?: CustomQuery }): Promise<void>;
  error: ComputedProperty<UseCartErrors>;
  loading: ComputedProperty<boolean>;
}
export interface UseWishlistErrors {
  addItem?: Error;
  removeItem?: Error;
  load?: Error;
  clear?: Error;
}
export interface UseWishlist
<
  WISHLIST,
  WISHLIST_ITEM,
  PRODUCT,
> {
  wishlist: ComputedProperty<WISHLIST>;
  loading: ComputedProperty<boolean>;
  addItem(params: { product: PRODUCT; customQuery?: CustomQuery }): Promise<void>;
  removeItem(params: { product: WISHLIST_ITEM; customQuery?: CustomQuery }): Promise<void>;
  load(): Promise<void>;
  load(params: { customQuery?: CustomQuery }): Promise<void>;
  clear(): Promise<void>;
  setWishlist: (wishlist: WISHLIST) => void;
  isOnWishlist({ product: PRODUCT }): boolean;
  error: ComputedProperty<UseWishlistErrors>;
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
export interface UseReviewErrors {
  search?: Error;
  addReview?: Error;
}
export interface UseReview<REVIEW, REVIEWS_SEARCH_PARAMS, REVIEW_ADD_PARAMS> {
  search(params: ComposableFunctionArgs<REVIEWS_SEARCH_PARAMS>): Promise<void>;
  addReview(params: ComposableFunctionArgs<REVIEW_ADD_PARAMS>): Promise<void>;
  error: ComputedProperty<UseReviewErrors>;
  reviews: ComputedProperty<REVIEW>;
  loading: ComputedProperty<boolean>;
  [x: string]: any;
}
export interface UseCheckoutShipping<SHIPPING, SHIPPING_PARAMS> {
  shipping: ComputedProperty<SHIPPING>;
  error: ComputedProperty<UseCheckoutShippingErrors>;
  loading: ComputedProperty<boolean>;
  load: () => Promise<void>;
  save: (params: { params: SHIPPING_PARAMS; shippingDetails: any }) => Promise<void>;
}
export interface UseCheckoutShippingErrors {
  load?: Error;
  save?: Error;
}
export interface UseCheckoutShippingMethodErrors {
  load?: Error;
  save?: Error;
}
export interface UseCheckoutShippingMethod<SHIPPING_METHODS, SHIPPING_METHOD_PARAMS> {
  shippingMethods: ComputedProperty<SHIPPING_METHODS>;
  error: ComputedProperty<UseCheckoutShippingErrors>;
  loading: ComputedProperty<boolean>;
  load: () => Promise<void>;
  save: (params: SHIPPING_METHOD_PARAMS) => Promise<void>;
}
export interface UseCheckoutShippingGetters<SHIPPING, SHIPPING_ADDRESS_ITEM, SHIPPING_METHOD_ITEM> {
  getAddresses: (billing: SHIPPING, criteria?: Record<string, any>) => SHIPPING_ADDRESS_ITEM[];
  getMethods: (billing: SHIPPING, criteria?: Record<string, any>) => SHIPPING_METHOD_ITEM[];
  getAddressPostCode: (address: SHIPPING_ADDRESS_ITEM) => string;
  getAddressStreetName: (address: SHIPPING_ADDRESS_ITEM) => string;
  getAddressStreetNumber: (address: SHIPPING_ADDRESS_ITEM) => string | number;
  getAddressCity: (address: SHIPPING_ADDRESS_ITEM) => string;
  getAddressFirstName: (address: SHIPPING_ADDRESS_ITEM) => string;
  getAddressLastName: (address: SHIPPING_ADDRESS_ITEM) => string;
  getAddressCountry: (address: SHIPPING_ADDRESS_ITEM) => string;
  getAddressPhone: (address: SHIPPING_ADDRESS_ITEM) => string;
  getAddressEmail: (address: SHIPPING_ADDRESS_ITEM) => string;
  getAddressProvince: (address: SHIPPING_ADDRESS_ITEM) => string;
  getAddressCompanyName: (address: SHIPPING_ADDRESS_ITEM) => string;
  getAddressTaxNumber: (address: SHIPPING_ADDRESS_ITEM) => string;
  getAddressApartmentNumber: (address: SHIPPING_ADDRESS_ITEM) => string | number;
  isAddressDefault: (address: SHIPPING_ADDRESS_ITEM) => boolean;
}

export interface UseCheckoutShippingMethodGetters<SHIPPING_METHODS, SHIPPING_MEDHOD_ITEM> {
  getShippingMethods: (methods: SHIPPING_METHODS, criteria?: Record<string, any>) => SHIPPING_MEDHOD_ITEM[];
  getMethodName: (method: SHIPPING_MEDHOD_ITEM) => string;
  getMethodDescription: (method: SHIPPING_MEDHOD_ITEM) => string;
  getMethodPrice: (method: SHIPPING_MEDHOD_ITEM) => AgnosticPrice;
  isMethodDefault: (method: SHIPPING_MEDHOD_ITEM) => boolean;
}
export interface UseFacetErrors {
  search?: Error;
}
export interface UseFacet<SEARCH_DATA> {
  result: ComputedProperty<FacetSearchResult<SEARCH_DATA>>;
  loading: ComputedProperty<boolean>;
  search: (params?: AgnosticFacetSearchParams) => Promise<void>;
  error: ComputedProperty<UseFacetErrors>;
}
export interface UseContentErrors {
  search?: Error;
}
export interface UseContent<CONTENT, CONTENT_SEARCH_PARAMS> {
  search: (params: CONTENT_SEARCH_PARAMS) => Promise<void>;
  content: ComputedProperty<CONTENT>;
  loading: ComputedProperty<boolean>;
  error: ComputedProperty<UseContentErrors>;
}

export interface RenderComponent {
  componentName: string;
  props?: {};
}

export interface ProductGetters<PRODUCT, PRODUCT_FILTER> {
  getName: (product: PRODUCT) => string;
  getSlug: (product: PRODUCT) => string;
  getPrice: (product: PRODUCT) => AgnosticPrice;
  getGallery: (product: PRODUCT) => AgnosticMediaGalleryItem[];
  getCoverImage: (product: PRODUCT) => string;
  getFiltered: (products: PRODUCT[], filters?: PRODUCT_FILTER) => PRODUCT[];
  getAttributes: (products: PRODUCT[] | PRODUCT, filters?: Array<string>) => Record<string, AgnosticAttribute | string>;
  getDescription: (product: PRODUCT) => string;
  getCategoryIds: (product: PRODUCT) => string[];
  getId: (product: PRODUCT) => string;
  getFormattedPrice: (price: number) => string;
  getTotalReviews: (product: PRODUCT) => number;
  getAverageRating: (product: PRODUCT) => number;
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
  // @deprecated - use getDiscounts instead
  getCoupons: (cart: CART) => AgnosticCoupon[];
  getDiscounts: (cart: CART) => AgnosticDiscount[];
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
  getEmailAddress: (customer: USER) => string;
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
  getItemPrice: (item: ORDER_ITEM) => number;
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

export interface AgnosticCoupon {
  id: string;
  name: string;
  code: string;
  value: number;
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
  count?: number;
  [x: string]: unknown;
}

export interface AgnosticPrice {
  regular: number | null;
  special?: number | null;
}

export interface AgnosticTotals {
  total: number;
  subtotal: number;
  special?: number;
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
  rootCatSlug?: string;
  term?: string;
  page?: number;
  itemsPerPage?: number;
  sort?: string;
  filters?: Record<string, string[]>;
  metadata?: any;
  [x: string]: any;
}

export interface VSFLogger {
  debug(message?: any, ...args: any): void;
  info(message?: any, ...args: any): void;
  warn(message?: any, ...args: any): void;
  error(message?: any, ...args: any): void;
}

export interface AgnosticDiscount {
  id: string;
  name: string;
  description: string;
  value: number;
  code?: string;
}

export interface IntegrationContext<CLIENT = any, CONFIG = any, API = any> {
  client: CLIENT;
  config: CONFIG;
  api: API;
  [x: string]: any;
}

export interface Context {
  [x: string]: IntegrationContext | any;
}

export interface FactoryParams {
  provide?: (context: Context) => any;
}

export interface HookParams<C> {
  configuration: C;
}

export interface CallHookParams<C> extends HookParams<C> {
  callName: string;
}

export type BeforeCallArgs = any;
export type AfterCallArgs = any;

export interface BeforeCallParams< C> extends CallHookParams<C> {
  args: BeforeCallArgs;
}

export interface AfterCallParams<C> extends CallHookParams<C> {
  response: AfterCallArgs;
}

export interface ApiClientExtensionHooks<C = any> {
  beforeCreate?: (params: HookParams<C>) => C;
  afterCreate?: (params: HookParams<C>) => C;
  beforeCall?: (params: BeforeCallParams<C>) => BeforeCallArgs;
  afterCall?: (params: AfterCallParams<C>) => AfterCallArgs;
}

export interface ApiClientExtension {
  name: string;
  extendApiMethods?: Record<string, Function>;
  hooks?: (req: Request, res: Response) => ApiClientExtensionHooks;
}

export interface Integration {
  location: string;
  configuration: any;
  extensions: (extensions: ApiClientExtension[]) => ApiClientExtension[];
}

export type IntegrationsSection = Record<string, Integration>

export interface MiddlewareConfig {
  integrations: Record<string, Integration>;
}

export interface ApiClientFactoryParams<T, F = any> {
  api: F;
  isProxy?: boolean;
  onCreate: (config: T, headers?: Record<string, string>) => { config: T; client: any };
  extensions?: ApiClientExtension[];
}

export interface ApiInstance {
  api: any;
  client: any;
  settings: any;
}

export interface ApiClientFactory {
  createApiClient: CreateApiClientFn;
}

export type CreateApiProxyFn = (givenConfig: any, customApi?: any) => ApiInstance
export type CreateApiClientFn = (givenConfig: any, customApi?: any) => ApiInstance;

export interface ApiClientConfig {
  [x: string]: any;
  client?: any;
  extensions?: ApiClientExtension[];
}
