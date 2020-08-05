import { ApolloQueryResult } from 'apollo-client';
import { Me } from './GraphQL';

export type QueryResponse <K extends string, V> = ApolloQueryResult<Record<K, V>>

export type ProfileResponse = QueryResponse<'me', Me>
