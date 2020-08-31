import { Filter } from '@vue-storefront/commercetools-api/lib/types/Api';
import { ApolloQueryResult } from 'apollo-client';

export type OrderSearchParams = {
  id?: string;
  page?: number;
  perPage?: number;
};

export interface ProductsSearchParams {
  perPage?: number;
  page?: number;
  sort?: any;
  term?: any;
  filters?: Record<string, Filter>;
  catId?: string | string[];
  skus?: string[];
  slug?: string;
  id?: string;
}

export type CustomQuery = (query, variables) => Promise<ApolloQueryResult<any>>
