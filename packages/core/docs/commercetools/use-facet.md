# `useFacet` <Badge text="Enterprise" type="info" />

:::warning
This feature is a part of our commercial offering but also exists in the Open Source version of our commercetools integration.

Open Source implementation relies on GraphQL API (internally using `getProduct` and `getCategory` composables), which doesn't provide full faceting capabilities as does the dedicated REST-based faceting API offered in our Enterprise version. Please [contact our team](https://www.vuestorefront.io/contact/sales) if you'd like to get access to it.
:::

## Features

`useFacet` composition function can be used to fetch data related to:

* products,
* categories,
* breadcrumbs.

What makes it powerful is the ability to accept multiple filters, allowing to narrow down the results to a specific category, search term, etc.

For more information about faceting, please refer to [this page](../composables/use-facet.md).

## API

`useFacet` contains the following properties:

- `search` - function for searching and classifying records, allowing users to browse the catalog data. It accepts a single object as a parameter with following signature:

```ts
interface AgnosticFacetSearchParams {
  categorySlug?: string;
  rootCatSlug?: string;
  term?: string;
  page?: number;
  itemsPerPage?: number;
  sort?: string;
  filters?: Record<string, string[]>;
  metadata?: any;
  [x: string]: any;
}
```

- `result` - reactive data object containing the response from the backend.

- `loading` - reactive object containing information about the loading state of `search`.

- `error` - reactive object containing the error message, if `search` failed for any reason.

```ts
interface UseFacetErrors {
  search?: Error;
}
```

## Getters
Because the `result` property is a raw response with some additional properties, it's recommended to use `facetGetters` for accessing any data from it. It includes the following helper functions:

- `getAll` - returns all available facets.

- `getGrouped` - returns grouped facets by facet name.

- `getCategoryTree` - return the tree of nested categories.

- `getSortOptions` - returns available and currently selected sorting options.

- `getProducts` - returns products matching current filters.

- `getPagination` - returns pagination information.

- `getBreadcrumbs` - returns breadcrumbs information.


```ts
interface FacetsGetters {
  getAll: (searchData: SearchData, criteria?: string[]) => AgnosticFacet[];
  getGrouped: (searchData: SearchData, criteria?: string[]) => AgnosticGroupedFacet[];
  getCategoryTree: (searchData: SearchData) => AgnosticCategoryTree;
  getSortOptions: (searchData: SearchData) => AgnosticSort;
  getProducts: (searchData: SearchData) => ProductVariant[];
  getPagination: (searchData: SearchData) => AgnosticPagination;
  getBreadcrumbs: (searchData: SearchData) => AgnosticBreadcrumb[];
}

interface AgnosticFacet {
  type: string;
  id: string;
  value: any;
  attrName?: string;
  count?: number;
  selected?: boolean;
  metadata?: any;
}

interface AgnosticGroupedFacet {
  id: string;
  label: string;
  count?: number;
  options: AgnosticFacet[];
}

interface AgnosticCategoryTree {
  label: string;
  slug?: string;
  items: AgnosticCategoryTree[];
  isCurrent: boolean;
  count?: number;
  [x: string]: unknown;
}

interface AgnosticSort {
  options: AgnosticFacet[];
  selected: string;
}

type SearchData = FacetSearchResult<FacetResultsData>

interface FacetSearchResult {
  data;
  input: AgnosticFacetSearchParams;
}

interface AgnosticFacetSearchParams {
  categorySlug?: string;
  rootCatSlug?: string;
  term?: string;
  page?: number;
  itemsPerPage?: number;
  sort?: string;
  filters?: Record<string, string[]>;
  metadata?: any;
  [x: string]: any;
}

interface AgnosticPagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  pageOptions: number[];
}

interface AgnosticBreadcrumb {
  text: string;
  link: string;
}

interface FacetResultsData {
  products: ProductVariant[];
  categories: Category[];
  facets: Record<string, Filter>;
  total: number;
  perPageOptions: number[];
  itemsPerPage: number;
}

type ProductVariant = {
  __typename?: "ProductVariant";
  id: Scalars["Int"];
  key?: Maybe<Scalars["String"]>;
  sku?: Maybe<Scalars["String"]>;
  prices?: Maybe<Array<ProductPrice>>;
  price?: Maybe<ProductPrice>;
  images: Array<Image>;
  assets: Array<Asset>;
  availability?: Maybe<ProductVariantAvailabilityWithChannels>;
  attributesRaw: Array<RawProductAttribute>;
  attributes: ProductType;
  attributeList: Array<Attribute>;
}
```

## Configuration

::: warning
Configuration can be changed only for th Enterprise version of this package.
:::

Faceting configuration can be modified to change available sorting options, filters, etc.

If the explicit configuration is not provided, the following defaults will be used:

```javascript
{
  pageOptions: [
    20,
    50,
    100
  ],
  subcategoriesLimit: 100,
  availableFacets: [
    { facet: 'categories.id', type: 'string', option: 'subtree("*")', name: 'category' },
    { facet: 'variants.attributes.size', type: 'number', option: '', name: 'size' },
    { facet: 'variants.attributes.color.key', type: 'string', option: '', name: 'color' }
  ],
  sortingOptions: [
    { id: 'latest', name: 'Latest', facet: 'createdAt', direction: 'desc' },
    { id: 'price-up', name: 'Price from low to high', facet: 'price', direction: 'asc' },
    { id: 'price-down', name: 'Price from high to low', facet: 'price', direction: 'desc' },
    { id: 'relevance', name: 'Relevance', facet: 'score', direction: 'desc' },
  ],
  filteringStrategy: 'filter'
}
```

Configuration can be modified by passing identical configuration to:
- `@vsf-enterprise/ct-faceting/nuxt` module in `nuxt.config.js`.
- `@vsf-enterprise/ct-faceting/server` integration in `middleware.config.js`.

## Example

```js
import { useFacet, facetGetters } from '@vsf-enterprise/commercetools';

setup(props, context) {
  const { result, search, loading } = useFacet();

  onSSR(async () => {
    await search({
      categorySlug: 'clothing',
      sort: 'latest',
      itemsPerPage: 10,
      term: 'some search query'
    });
  });

  return {
    products: computed(() => facetGetters.getProducts(result.value)),
    categoryTree: computed(() => facetGetters.getCategoryTree(result.value)),
    breadcrumbs: computed(() => facetGetters.getBreadcrumbs(result.value)),
    sortBy: computed(() => facetGetters.getSortOptions(result.value)),
    facets: computed(() => facetGetters.getGrouped(result.value, ['color', 'size'])),
    pagination: computed(() => facetGetters.getPagination(result.value)),
    loading
  }
}
```
