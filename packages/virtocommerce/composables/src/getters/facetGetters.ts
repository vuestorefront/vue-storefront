import {
  FacetsGetters,
  AgnosticCategoryTree,
  AgnosticGroupedFacet,
  AgnosticPagination,
  AgnosticSort,
  AgnosticBreadcrumb,
  AgnosticFacet
} from '@vue-storefront/core';
import { Product } from '@vue-storefront/virtocommerce-api';
import { getCategoryTree as buildCategoryTree } from './categoryGetters';

// TODO: move to the config file
const ITEMS_PER_PAGE = [20, 40, 100];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getAll = (searchData, criteria?: string[]): AgnosticFacet[] => [];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getGrouped = (searchData, criteria?: string[]): AgnosticGroupedFacet[] =>[];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getSortOptions = (searchData: any): AgnosticSort => {
  const options = [
    { type: 'sort', id: 'latest', value: 'Latest', count: null },
    { type: 'sort', id: 'price-up', value: 'Price from low to high', count: null },
    { type: 'sort', id: 'price-down', value: 'Price from high to low', count: null }
  ].map(o => ({ ...o, selected: o.id === searchData.input.sort }));

  const selected = options.find(o => o.id === searchData.input.sort)?.id || 'latest';

  return { options, selected };
};


// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getCategoryTree = (searchData): AgnosticCategoryTree => {

  if (!searchData?.data?.categories) {
    return {} as any;
  }

  const result = {
  id: "1",
  label: "Electronics",
  slug: "",
  items: searchData.data.categories.map(x => buildCategoryTree(x)),
  isCurrent: true
 };
 return result;

};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getProducts = (searchData): any => {
  return searchData.data.products;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getPagination = (searchData): AgnosticPagination => {
  if (!searchData.data) {
    return {} as any;
  }
  return {
    currentPage: 1,
    totalPages: Math.ceil(searchData.data.total / 10),
    totalItems: searchData.data.total,
    itemsPerPage: 10,
    pageOptions: ITEMS_PER_PAGE,
  };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getBreadcrumbs = (searchData): AgnosticBreadcrumb[] => [];

const facetGetters: FacetsGetters<any, any> = {
  getSortOptions,
  getGrouped,
  getAll,
  getProducts,
  getCategoryTree,
  getBreadcrumbs,
  getPagination
};

export default facetGetters;
