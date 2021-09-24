import { ApolloQueryResult } from 'apollo-client';
import { FetchResult } from 'apollo-link';
import { ApiClientMethods } from '@vue-storefront/core';
import { Token, CustomerCredentials } from './setup';
import { UpdateCartParams } from '../api/updateCart';
import { GetMeParams } from '../api/getMe';
import { ShippingMethodData } from '../api/getShippingMethods';
import { GetStoresParams } from '../api/getStores';
import {
  Cart,
  Order,
  ShippingMethod,
  CustomerSignInResult,
  Customer,
  CartDraft,
  ProductVariant,
  OrderMyCartCommand,
  CustomerSignMeInDraft,
  CustomerSignMeUpDraft,
  ReferenceInput,
  Address,
  LineItem,
  CategoryQueryResult,
  CategorySearchResult,
  ProductQueryResult,
  Me,
  CartQueryInterface,
  CustomerPasswordToken,
  StoreQueryResult
} from './GraphQL';

export interface BaseSearch {
  limit?: number;
  offset?: number;
  sort?: string[];
}

export enum AttributeType {
  STRING = 'StringAttribute',
  DATE = 'DateAttribute',
  DATETIME = 'DateTimeAttribute',
  TIME = 'TimeAttribute',
  NUMBER = 'NumberAttribute',
  ENUM = 'EnumAttribute',
  LOCALIZED_ENUM = 'LocalizedEnumAttribute',
  LOCALIZED_STRING = 'LocalizedStringAttribute',
  MONEY = 'MoneyAttribute',
  BOOLEAN = 'BooleanAttribute'
}

export interface Filter {
  type: AttributeType;
  name: string;
  value: any;
}

export interface ProductWhereSearch extends BaseSearch {
  catId?: string | string[];
  skus?: string[];
  slug?: string;
  id?: string;
  ids?: string[];
  key?: string;
  filters?: Filter[];
}

export interface FilterOption {
  label: string;
  value: string | number | boolean | [number, number] | [string, string];
  selected: boolean;
}

export interface CategoryWhereSearch extends BaseSearch {
  catId?: string;
  key?: string;
  slug?: string;
}

export interface OrderWhereSearch extends BaseSearch {
  id?: string;
  orderNumber?: string;
}

export interface FlowOptions {
  currentToken?: Token;
  customerCredentials?: CustomerCredentials;
  requireUserSession?: boolean;
}

export interface CartData extends Omit<CartDraft, 'currency'> {
  currency?: string;
}

export type ApiResponseWrapper <KEY extends string, T> = Record<KEY, T>;

export type QueryResponse<K extends string, V> = ApolloQueryResult<Record<K, V>>;
export type MutationResponse<K extends string, V> = FetchResult<Record<K, V>>;
export type CartQueryResponse = QueryResponse<'cart', Cart>;
export type OrderQueryResponse = QueryResponse<'order', Order>;
export type CartMutationResponse = MutationResponse<'cart', Cart>;
export type CartResponse = CartQueryResponse | CartMutationResponse;
export type OrderMutationResponse = MutationResponse<'order', Order>;
export type OrderResponse = OrderQueryResponse | OrderMutationResponse;
export type ShippingMethodsResponse = QueryResponse<'shippingMethods', ShippingMethod>;
export type SignInResponse = QueryResponse<'user', CustomerSignInResult>;
export type ChangeMyPasswordResponse = QueryResponse<'user', Customer>;
export type CartDetails = Pick<Cart, 'id' | 'version'>;
export type CreatePasswordResetTokenResponse = QueryResponse<'customerCreatePasswordResetToken', CustomerPasswordToken>;
export type ResetPasswordResponse = QueryResponse<'customerResetPassword', Customer>;

interface ApiMethods {
  addToCart ({ id, version }: CartDetails, params: {
    product: ProductVariant;
    quantity: number;
    supplyChannel?: string;
    distributionChannel?: string;
  }): Promise<CartResponse>;
  applyCartCoupon ({ id, version }: CartDetails, discountCode: string): Promise<CartResponse>;
  createCart (cartDraft?: CartData): Promise<{ data: CartQueryInterface }>;
  createMyOrderFromCart (draft: OrderMyCartCommand): Promise<OrderMutationResponse>;
  customerChangeMyPassword (version: any, currentPassword: string, newPassword: string): Promise<ChangeMyPasswordResponse>;
  customerSignMeIn (draft: CustomerSignMeInDraft): Promise<SignInResponse>;
  customerSignMeUp (draft: CustomerSignMeUpDraft): Promise<SignInResponse>;
  customerSignOut (): Promise<void>;
  customerUpdateMe (currentUser, updatedUserData): Promise<any>;
  customerResetPassword (tokenValue: string, newPassword: string): Promise<ResetPasswordResponse>;
  customerCreatePasswordResetToken (email: string): Promise<CreatePasswordResetTokenResponse>;
  deleteCart ({ id, version }: CartDetails): Promise<CartResponse>;
  getCart (cartId: string): Promise<CartQueryResponse>;
  getCategory (params): Promise<QueryResponse<'categories', CategoryQueryResult>>;
  categorySearch (params): Promise<QueryResponse<'categorySearch', CategorySearchResult>>;
  getMe (params?: GetMeParams): Promise<{ data: { me: Me } }>;
  getOrders (params): Promise<{ data: { me: Me } }>;
  getProduct (params): Promise<QueryResponse<'products', ProductQueryResult>>;
  getShippingMethods (cartId?: string): Promise<ShippingMethodData>;
  removeCartCoupon ({ id, version }: CartDetails, discountCode: ReferenceInput): Promise<CartResponse>;
  removeFromCart ({ id, version }: CartDetails, product: LineItem): Promise<CartResponse>;
  updateCart (params: UpdateCartParams): Promise<CartResponse>;
  updateCartQuantity ({ id, version }: CartDetails, product: LineItem): Promise<CartResponse>;
  updateShippingDetails (cart: Cart, shippingDetails: Address): Promise<CartResponse>;
  isGuest: () => boolean;
  getStores(params: GetStoresParams): Promise<StoreQueryResult>;
}

export type CommercetoolsMethods = ApiClientMethods<ApiMethods>
