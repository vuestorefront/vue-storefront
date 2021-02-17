# `useFacet`

## Features

A composable responsible for (basic) faceting. This implementation rely on GraphQL api which means it not 100% complete faceting as commercetools provide in their dedicated rest-based faceting api. This one based on product and category query provided by `getProduct` and `getCategory` functions from `@vue-storefront/commercetools-api`. For more info regarding faceting and how it works, please read the core factory documentation available [here](/vsf-core/faceting).

## API

```ts
interface ProductsSearchParams {
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
```

## Getters

```ts
interface FacetsGetters {
  // returns all available facets
  getAll: (searchData: FacetSearchResult<SEARCH_DATA>, criteria?: CRITERIA) => AgnosticFacet[];

  // returns grouped facets by facet name
  getGrouped: (searchData: FacetSearchResult<SEARCH_DATA>, criteria?: CRITERIA) => AgnosticGroupedFacet[];

  // return the category nested tree
  getCategoryTree: (searchData: FacetSearchResult<SEARCH_DATA>) => AgnosticCategoryTree;

  // returns sorting options and current selected one
  getSortOptions: (searchData: FacetSearchResult<SEARCH_DATA>) => AgnosticSort;

  // returns products that were found
  getProducts: (searchData: FacetSearchResult<SEARCH_DATA>) => RESULTS;

  // returns pagination settings
  getPagination: (searchData: FacetSearchResult<SEARCH_DATA>) => AgnosticPagination;

  // returns breadcrumbs
  getBreadcrumbs: (searchData: FacetSearchResult<SEARCH_DATA>) => AgnosticBreadcrumb[];
  [getterName: string]: (element: any, options?: any) => unknown;
}
```

## Example

Example of the category page browsing.

```js
import { useFacet, facetGetters } from '@vue-storefront/your-integration';

setup(props, context) {
  const { result, search, loading } = useFacet();
  const products = computed(() => facetGetters.getProducts(result.value));
  const categoryTree = computed(() => facetGetters.getCategoryTree(result.value));
  const breadcrumbs = computed(() => facetGetters.getBreadcrumbs(result.value));
  const sortBy = computed(() => facetGetters.getSortOptions(result.value));
  const facets = computed(() => facetGetters.getGrouped(result.value, ['color', 'size']));
  const pagination = computed(() => facetGetters.getPagination(result.value));

  onSSR(async () => {
    await search({ categorySlug: 'clothing', sortBy: 'latest' });
  });

  return {
    products,
    categoryTree,
    breadcrumbs,
    sortBy,
    facets,
    pagination,
    loading
  }
}
```
