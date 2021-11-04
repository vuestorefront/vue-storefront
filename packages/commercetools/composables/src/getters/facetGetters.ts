import {
  FacetsGetters,
  AgnosticCategoryTree,
  AgnosticGroupedFacet,
  AgnosticPagination,
  AgnosticSort,
  AgnosticBreadcrumb,
  AgnosticFacet
} from '@vue-storefront/core';
import { ProductVariant } from '@vue-storefront/commercetools-api';
import { getProductFiltered } from './productGetters';
import { getCategoryTree as buildCategoryTree } from './categoryGetters';
import { buildBreadcrumbs, buildFacets, reduceForGroupedFacets, reduceForFacets } from './../useFacet/_utils';
import { FacetResultsData, SearchData } from './../types';

const getAll = (searchData: SearchData, criteria?: string[]): AgnosticFacet[] => buildFacets(searchData, reduceForFacets, criteria);

const getGrouped = (searchData: SearchData, criteria?: string[]): AgnosticGroupedFacet[] =>
  buildFacets(searchData, reduceForGroupedFacets, criteria);

const getSortOptions = (searchData: SearchData): AgnosticSort => {
  const options = [
    { type: 'sort', id: 'latest', value: 'Latest', count: null },
    { type: 'sort', id: 'price-up', value: 'Price from low to high', count: null },
    { type: 'sort', id: 'price-down', value: 'Price from high to low', count: null }
  ].map(o => ({ ...o, selected: o.id === searchData.input.sort }));

  const selected = options.find(o => o.id === searchData.input.sort)?.id || 'latest';

  return { options, selected };
};

const getCategoryTree = (searchData: SearchData): AgnosticCategoryTree => {
  if (!searchData.data) {
    return {} as any;
  }

  return buildCategoryTree(searchData.data.categories[0]);
};

const getProducts = (searchData: SearchData): ProductVariant[] => {
  return getProductFiltered(searchData.data?.products || [], { master: true });
};

const getPagination = (searchData: SearchData): AgnosticPagination => {
  if (!searchData.data) {
    return {} as any;
  }

  return {
    currentPage: searchData.input.page,
    totalPages: Math.ceil(searchData.data.total / searchData.data.itemsPerPage),
    totalItems: searchData.data.total,
    itemsPerPage: searchData.input.itemsPerPage,
    pageOptions: searchData.data.perPageOptions
  };
};

const getBreadcrumbs = (searchData: SearchData): AgnosticBreadcrumb[] => {
  if (!searchData.data) {
    return [];
  }

  return [
    { text: 'Home', link: '/' },
    ...buildBreadcrumbs(searchData.data.categories[0]).map(b => ({ ...b, link: `/c${b.link}` }))
  ];
};

/**
 * @remarks References:
 * {@link FacetResultsData}, {@link @vue-storefront/commercetools-api#ProductVariant}
 */
const facetGetters: FacetsGetters<FacetResultsData, ProductVariant[]> = {
  getSortOptions,
  getGrouped,
  getAll,
  getProducts,
  getCategoryTree,
  getBreadcrumbs,
  getPagination
};

export default facetGetters;
