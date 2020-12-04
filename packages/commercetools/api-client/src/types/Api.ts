import { ApolloQueryResult } from 'apollo-client';
import { FetchResult } from 'apollo-link';
import { Cart, Order, ShippingMethod, CustomerSignInResult, Customer, CartDraft } from './GraphQL';
import { Token, CustomerCredentials } from './setup';

export type CustomQueryFn<T = any> = (query: any, variables: T) => {
  query?: any;
  variables?: T;
};

export interface BaseSearch {
  limit?: number;
  offset?: number;
  sort?: string[];
}

export interface ProductWhereSearch extends BaseSearch {
  catId?: string | string[];
  skus?: string[];
  slug?: string;
  id?: string;
  filters?: Filter[];
}

export interface Filter {
  type: AttributeType;
  name: string;
  value: any;
}

export interface FilterOption {
  label: string;
  value: string | number | boolean | [number, number] | [string, string];
  selected: boolean;
}

export interface CategoryWhereSearch extends BaseSearch {
  catId?: string;
  slug?: string;
}

export interface OrderWhereSearch extends BaseSearch {
  id?: string;
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
export interface FlowOptions {
  currentToken?: Token;
  customerCredentials?: CustomerCredentials;
  requireUserSession?: boolean;
}

export interface CartData extends Omit<CartDraft, 'currency'> {
  currency?: string;
}

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
