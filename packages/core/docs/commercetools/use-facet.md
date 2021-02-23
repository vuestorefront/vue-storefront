# `useFacet` <Badge text="Enterprise" type="info" />

> This feature is a part of our commercial offering but also exists in Open Source version of commercetools integration simple search based on product and category endpoints. Read more about a Vue Storefront Enterprise Cloud [here](https://www.vuestorefront.io/cloud)

## Features

`useFacet` composable responsible for faceting. For more info regarding faceting and how it works, please read the core factory documentation available [here](/composables/use-facet). 

## API

- `search` - function for searching and classifying records, allowing users to browse the catalog data. This method accepts a single `params` object. The `params` has the following option:

    - `params: AgnosticFacetSearchParams`

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

- `result: AgnosticFacetSearchParams` - a main data object.

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

- `loading: boolean` - a reactive object containing information about loading state of your search method.

- `error: UseFacetErrors` - reactive object containing the error message, if search failed for any reason.

```ts
interface UseFacetErrors {
  search?: Error;
}
```

## Getters

- `getAll` - returns all available facets.

- `getGrouped` - returns grouped facets by facet name.

- `getCategoryTree` - return the category nested tree.

- `getSortOptions` - returns sorting options and current selected one.

- `getProducts` - returns products that were found.

- `getPagination` - returns pagination settings.

- `getBreadcrumbs` - returns breadcrumbs.

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

interface FacetSearchResult{
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

## Example

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
