import { Filter, ProductVariant, Category } from '@vue-storefront/commercetools-api';
import { FacetSearchData } from '@vue-storefront/core';

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

export interface FacetSearchInput {
  categorySlug: string;
  page: number;
  itemsPerPage: number;
  sort: string;
  filters: Record<string, string[]>;
  metadata?: any;
}

export interface FacetResultsData {
  products: ProductVariant[];
  categories: Category[];
  availableFilters: Record<string, Filter>;
  totalHits: number;
  perPageOptions: number[];
  itemsPerPage: number;
}

export type SearchData = FacetSearchData<FacetResultsData, FacetSearchInput>
