import { UseCategory } from '@vue-storefront/core';
import { ComputedProperty } from '@vue-storefront/core';

// Backbone types
import { BapiProduct } from '@aboutyou/backbone/types/BapiProduct';
import { ProductWith } from '@aboutyou/backbone/types/ProductWith';
import { BapiCategory } from '@aboutyou/backbone/types/BapiCategory';
import { BasketItem, BasketWith, BasketResponseData } from '@aboutyou/backbone/endpoints/basket/getBasket';
import { WishlistItem, WishlistWith, WishlistResponseData } from '@aboutyou/backbone/endpoints/wishlist/getWishlist';
import { ProductSearchQuery } from '@aboutyou/backbone/types/ProductSearchQuery';
import { ProductsSearchEndpointParameters, ProductSortConfig } from '@aboutyou/backbone/endpoints/products/products';
import { CategoryBySlugEndpointParameters } from '@aboutyou/backbone/endpoints/categories/categoryBySlug';
import { SearchSuggestionsEndpointParameters } from '@aboutyou/backbone/endpoints/search/suggestions';

// @todo: replace with real BapiUser type when AYC publishes that part of api
type BapiUser = {
  firstName?: string;
  lastName?: string;
  email?: string;
}

type BapiUserAddress = {
}

// @todo: replace with real BapiCart types when AYC publishes that part of api
type BapiCoupon = {

}

// @todo: replace with real BapiOrder type when AYC publishes that part of api
type BapiOrder = {

}

// @todo: replace with real BapiOrder type when AYC publishes that part of api
type BapiLineItem = {

}

// @todo: replace with real BapiOrder type when AYC publishes that part of api
type BapiOrderSearchParams = {

}

// @todo: replace with real BapiOrder type when AYC publishes that part of api
type BapiShippingMethod = {

}

// @todo: fill missing types
export type Filter = {
  type: string;
  key: string;
  [x: string]: any;
}

export interface UseCompare<PRODUCT> {
  compare: ComputedProperty<PRODUCT[]>;
  addToCompare: (product: PRODUCT) => Promise<void>;
  removeFromCompare: (product: PRODUCT) => Promise<void>;
  clearCompare: () => Promise<void>;
  loading: ComputedProperty<boolean>;
}

export interface UseSearch<SEARCH_RESULTS, SEARCH_PARAMS> {
  search: (searchParams: SEARCH_PARAMS) => Promise<void>;
  searchResults: ComputedProperty<SEARCH_RESULTS>;
  loading: ComputedProperty<boolean>;
}

export interface SearchResults {
  brands: {
    id: number;
    label: string;
    value: string;
  }[];
  categories: BapiCategory[];
  products: BapiProduct[];
  suggestions: AgnosticSuggestion[];
}

export type AgnosticSuggestion = {
  value: string;
  [x: string]: any;
}

export {
  UseCategory,
  BapiCoupon,

  // Mocked Types
  BapiOrder,
  BapiLineItem,
  BapiOrderSearchParams,
  BapiShippingMethod,
  BapiUser,
  BapiUserAddress,

  // Reexported BapiTypes
  BapiProduct,
  ProductWith,
  BapiCategory,
  BasketResponseData,
  BasketItem,
  BasketWith,
  WishlistResponseData,
  WishlistItem,
  WishlistWith,
  ProductSearchQuery,
  ProductsSearchEndpointParameters,
  ProductSortConfig,
  CategoryBySlugEndpointParameters,
  SearchSuggestionsEndpointParameters
};
