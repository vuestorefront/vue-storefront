import { ApolloQueryResult } from 'apollo-client'
import { FetchResult } from 'apollo-link'
import { Cart } from './GraphQL'

export interface CustomQuery {
  query: string
  variables: any
}

export interface BaseSearch {
  customQuery?: CustomQuery
  limit?: number
  offset?: number
  sort?: string[]
}

export interface ProductSearch extends BaseSearch {
  catIds?: string[]
  skus?: string[]
  slug?: string
}

export interface CategorySearch extends BaseSearch {
  catId?: string
  slug?: string
}


export type QueryResponse <K extends string, V> = ApolloQueryResult<Record<K, V>>
export type MutationResponse <K extends string, V> = FetchResult<Record<K, V>>

export type CartQueryResponse = QueryResponse<"cart", Cart>
export type CartMutationResponse = MutationResponse<"cart", Cart>
export type CartResponse = CartQueryResponse | CartMutationResponse
