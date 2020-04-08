import { ApolloQueryResult } from 'apollo-client';
import { FetchResult } from 'apollo-link';
import { Cart, Me, Order, ShippingMethod, CustomerSignInResult, Customer } from './GraphQL';

export interface CustomQuery {
  query: string;
  variables: any;
}

export interface BaseSearch {
  customQuery?: CustomQuery;
  limit?: number;
  offset?: number;
  sort?: string[];
}

export interface ProductSearch extends BaseSearch {
  catId?: string | string[];
  skus?: string[];
  slug?: string;
  id?: string;
}

export interface CategorySearch extends BaseSearch {
  catId?: string;
  slug?: string;
}

export interface OrderSearch extends BaseSearch {
  id?: string;
}

export type QueryResponse <K extends string, V> = ApolloQueryResult<Record<K, V>>
export type MutationResponse <K extends string, V> = FetchResult<Record<K, V>>
export type ProfileResponse = QueryResponse<'me', Me>
export type CartQueryResponse = QueryResponse<'cart', Cart>
export type OrderQueryResponse = QueryResponse<'order', Order>
export type CartMutationResponse = MutationResponse<'cart', Cart>
export type CartResponse = CartQueryResponse | CartMutationResponse
export type OrderMutationResponse = MutationResponse<'order', Order>
export type OrderResponse = OrderQueryResponse | OrderMutationResponse
export type ShippingMethodsResponse = QueryResponse<'shippingMethods', ShippingMethod>
export type SignInResponse = QueryResponse<'user', CustomerSignInResult>
export type ChangeMyPasswordResponse = QueryResponse<'user', Customer>
