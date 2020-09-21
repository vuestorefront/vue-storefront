import { ApolloQueryResult } from 'apollo-client';
import { FetchResult } from 'apollo-link';
import { Cart, Me, Order, ShippingMethod, CustomerSignInResult, Customer } from './GraphQL';

export interface CustomQuery<T> {
  query: any;
  variables: T;
}

export type CustomQueryFn<T = any> = (query?: any, variables?: T) => CustomQuery<T>;
export const getCustomQuery = <T = any>(customQueryFn: CustomQueryFn<T>, defaultQuery) => {
  const { query, variables } = customQueryFn();
  return customQueryFn ? { query: query || defaultQuery, variables: variables || {} } : { query: defaultQuery, variables: {} };
};

export interface BaseSearch {
  limit?: number;
  offset?: number;
  sort?: string[];
}

export interface ProductSearch extends BaseSearch {
  catId?: string | string[];
  skus?: string[];
  slug?: string;
  id?: string;
  filters?: Record<string, Filter>;
}

export interface Filter {
  options: FilterOption[];
  type: string;
}

export interface FilterOption {
  label: string;
  value: string | number | boolean | [number, number] | [string, string];
  selected: boolean;
}

export interface CategorySearch extends BaseSearch {
  catId?: string;
  slug?: string;
}

export interface OrderSearch extends BaseSearch {
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

export type QueryResponse<K extends string, V> = ApolloQueryResult<Record<K, V>>;
export type MutationResponse<K extends string, V> = FetchResult<Record<K, V>>;
export type ProfileResponse = QueryResponse<'me', Me>;
export type CartQueryResponse = QueryResponse<'cart', Cart>;
export type OrderQueryResponse = QueryResponse<'order', Order>;
export type CartMutationResponse = MutationResponse<'cart', Cart>;
export type CartResponse = CartQueryResponse | CartMutationResponse;
export type OrderMutationResponse = MutationResponse<'order', Order>;
export type OrderResponse = OrderQueryResponse | OrderMutationResponse;
export type ShippingMethodsResponse = QueryResponse<'shippingMethods', ShippingMethod>;
export type SignInResponse = QueryResponse<'user', CustomerSignInResult>;
export type ChangeMyPasswordResponse = QueryResponse<'user', Customer>;
