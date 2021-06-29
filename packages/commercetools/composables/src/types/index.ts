import { Filter, ProductVariant, Category, ResetPasswordResponse, CreatePasswordResetTokenResponse } from '@vue-storefront/commercetools-api';
import { FacetSearchResult } from '@vue-storefront/core';
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

export interface ForgotPasswordResult {
  resetPasswordResult: CreatePasswordResetTokenResponse;
  setNewPasswordResult: ResetPasswordResponse;
}

export type SearchData = FacetSearchResult<FacetResultsData>

export interface StoresData extends StoreQueryResult {
  _selected: string;
}
