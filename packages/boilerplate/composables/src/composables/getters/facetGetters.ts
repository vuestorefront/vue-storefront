import {
  FacetsGetters,
  AgnosticCategoryTree,
  AgnosticGroupedFacet,
  AgnosticPagination,
  AgnosticSort,
  AgnosticBreadcrumb,
  AgnosticFacet
} from '@vue-storefront/core';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getAll = (searchData, criteria?: string[]): AgnosticFacet[] => [];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getGrouped = (searchData, criteria?: string[]): AgnosticGroupedFacet[] =>[];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getSortOptions = (searchData): AgnosticSort => ({ options: [], selected: '' });

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getCategoryTree = (searchData): AgnosticCategoryTree => ({} as any);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getProducts = (searchData): any => {
  return [
    {
      _id: 1,
      _description: 'Some description',
      _categoriesRef: [
        '1',
        '2'
      ],
      name: 'Black jacket',
      sku: 'black-jacket',
      images: [
        'https://s3-eu-west-1.amazonaws.com/commercetools-maximilian/products/081223_1_large.jpg'
      ],
      price: {
        original: 12.34,
        current: 10.00
      }
    },
    {
      _id: 2,
      _description: 'Some different description',
      _categoriesRef: [
        '1',
        '2',
        '3'
      ],
      name: 'White shirt',
      sku: 'white-shirt',
      images: [
        'https://s3-eu-west-1.amazonaws.com/commercetools-maximilian/products/081223_1_large.jpg'
      ],
      price: {
        original: 15.11,
        current: 11.00
      }
    }
  ];
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getPagination = (searchData): AgnosticPagination => ({
  currentPage: 1,
  totalPages: 1,
  totalItems: 0,
  itemsPerPage: 10,
  pageOptions: []
});

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
