import {
  FacetsGetters,
  AgnosticCategoryTree,
  AgnosticGroupedFacet,
  AgnosticPagination,
  AgnosticSort,
  AgnosticBreadcrumb,
  AgnosticFacet,
  FacetSearchData
} from '@vue-storefront/core';
import { ProductVariant } from './../types/GraphQL';
import { getProductFiltered } from './productGetters';
import { getCategoryTree as buildCategoryTree } from './categoryGetters';
import { buildBreadcrumbs } from './_utils';
import { FacetSearchInput, FacetResultsData } from './../types';

type SearchData = FacetSearchData<FacetResultsData, FacetSearchInput>

const filterFacets = criteria => f => criteria ? criteria.includes(f) : true;

const createFacetsFromOptions = (options, selectedList) => options
  .map(({ label, value }) => ({
    type: 'attribute',
    id: label,
    value,
    selected: selectedList?.includes(value),
    count: null
  }));

const getFacets = (searchData: SearchData, criteria?: string[]): AgnosticFacet[] => {
  if (!searchData.data) {
    return [];
  }

  const filters = searchData.data.availableFilters;

  return Object.keys(filters)
    .filter(filterFacets(criteria))
    .reduce((prev, curr) => ([
      ...prev,
      ...createFacetsFromOptions(filters[curr]?.options || [], searchData.input.filters[curr])
    ]), []);
};

const getGroupedFacets = (searchData: SearchData, criteria?: string[]): AgnosticGroupedFacet[] => {
  if (!searchData.data) {
    return [];
  }

  const filters = searchData.data.availableFilters;

  return Object.keys(filters)
    .filter(filterFacets(criteria))
    .reduce((prev, curr) => ([
      ...prev,
      {
        id: curr,
        label: curr,
        options: createFacetsFromOptions(filters[curr].options, searchData.input.filters[curr]),
        count: null
      }
    ]), []);
};

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

const getResults = (searchData: SearchData): ProductVariant[] => {
  return getProductFiltered(searchData.data.products, { master: true });
};

const getPaginationInfo = (searchData: SearchData): AgnosticPagination => {
  if (!searchData.data) {
    return {} as any;
  }

  return {
    currentPage: searchData.input.page,
    totalPages: Math.ceil(searchData.data.totalHits / searchData.data.itemsPerPage),
    totalItems: searchData.data.totalHits,
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
    ...buildBreadcrumbs(searchData.data.categories[0])
  ].map(b => ({ ...b, link: `/c${b.link}` }));
};

const facetGetters: FacetsGetters<FacetResultsData, FacetSearchInput, ProductVariant[]> = {
  getSortOptions,
  getGroupedFacets,
  getFacets,
  getResults,
  getCategoryTree,
  getBreadcrumbs,
  getPaginationInfo
};

export default facetGetters;
