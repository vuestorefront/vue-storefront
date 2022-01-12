import {
  Filter,
  ProductVariant,
  Category,
  CategorySearch,
  ResetPasswordResponse,
  CreatePasswordResetTokenResponse,
  Store,
  StoreQueryResult
} from '@vue-storefront/commercetools-api';
import { FacetSearchResult } from '@vue-storefront/core';

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
  ids?: string[];
}

export interface FacetResultsData {
  products: ProductVariant[];
  categories: Category[]|CategorySearch[];
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
  _selectedStore: string;
}

export interface StoreGetters<STORES, CRITERIA = any> {
  getItems(stores: STORES, criteria?: CRITERIA): Store[];
  getSelected(stores: STORES): Store | undefined;
}
