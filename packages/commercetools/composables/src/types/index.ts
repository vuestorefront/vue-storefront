import { Filter, ProductVariant, Category } from '@vue-storefront/commercetools-api';
import { FacetSearchResult, AgnosticStore } from '@vue-storefront/core';
import { StoreQueryResult } from './GraphQL';

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

export interface FacetResultsData {
  products: ProductVariant[];
  categories: Category[];
  facets: Record<string, Filter>;
  total: number;
  perPageOptions: number[];
  itemsPerPage: number;
}

export type SearchData = FacetSearchResult<FacetResultsData>

export interface StoresData extends StoreQueryResult {
  _selected: string;
}

export interface StoresItem extends AgnosticStore {
  _storeID: string;
  _channelID: string;
}
