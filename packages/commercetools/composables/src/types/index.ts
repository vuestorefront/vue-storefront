import { Filter, ProductVariant, Category } from '@vue-storefront/commercetools-api';
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
