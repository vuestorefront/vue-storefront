import {
  FacetsGetters,
  AgnosticCategoryTree,
  AgnosticGroupedFacet,
  AgnosticPagination,
  AgnosticSort,
  AgnosticBreadcrumb,
  AgnosticFacet
} from '@vue-storefront/core';
import { ProductVariant } from './../types/GraphQL';
import { getProductFiltered } from './productGetters';
import { getCategoryTree as buildCategoryTree } from './categoryGetters';
import { buildBreadcrumbs, buildFacets, reduceForGroupedFacets, reduceForFacets } from './../useFacet/_utils';
import { FacetResultsData, SearchData } from './../types';

const getAll = (searchData: SearchData, criteria?: string[]): AgnosticFacet[] => buildFacets(searchData, reduceForFacets, criteria);

const getGrouped = (searchData: SearchData, criteria?: string[]): AgnosticGroupedFacet[] =>
  buildFacets(searchData, reduceForGroupedFacets, criteria);

const getSortOptions = (searchData: SearchData): AgnosticSort => {
  const options = [
    { type: 'sort', id: 'masterData.current.name.en asc', value: 'Name from A to Z', count: null },
    { type: 'sort', id: 'masterData.current.name.en desc', value: 'Name from Z to A', count: null }
  ].map(o => ({ ...o, selected: o.id === searchData.input.sort }));

  const selected = options.find(o => o.id === searchData.input.sort)?.id || 'masterData.current.name.en asc';

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
