---
platform: Commercetools
---

# Faceting

[[toc]]

## Features

`useFacet` composition function can be used to fetch data related to:

* products,
* categories,
* breadcrumbs.

What makes it powerful is the ability to accept multiple filters, allowing to narrow down the results to a specific category, search term, etc.

Unlike the open-source version, this extension relies on a dedicated REST-based faceting API, which provides more faceting capabilities.

For more information about faceting, please refer to [this page](../composables/../use-facet.md).

## API

`useFacet` contains the following properties:

- `search` - function for fetching the data. When invoked, it requests data from the API and populates `result` property. Results can be filtered by passing an object with following parameters:

```ts
export interface AgnosticFacetSearchParams {
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
interface FacetsGetters<SEARCH_DATA, RESULTS, CRITERIA = any> {
  getAll: (searchData: FacetSearchResult<SEARCH_DATA>, criteria?: CRITERIA) => AgnosticFacet[];
  getGrouped: (searchData: FacetSearchResult<SEARCH_DATA>, criteria?: CRITERIA) => AgnosticGroupedFacet[];
  getCategoryTree: (searchData: FacetSearchResult<SEARCH_DATA>) => AgnosticCategoryTree;
  getSortOptions: (searchData: FacetSearchResult<SEARCH_DATA>) => AgnosticSort;
  getProducts: (searchData: FacetSearchResult<SEARCH_DATA>) => RESULTS;
  getPagination: (searchData: FacetSearchResult<SEARCH_DATA>) => AgnosticPagination;
  getBreadcrumbs: (searchData: FacetSearchResult<SEARCH_DATA>) => AgnosticBreadcrumb[];
}
```

## Usage

When you already installed `@vsf-enterprise/ct-faceting` as a dependency, there are few minor modifications required to make it work.

The first step is to add `@vsf-enterprise/ct-faceting` to `build > transpile` array in `nuxt.config.js`:

```javascript
{
    build: {
      transpile: [
        '@vsf-enterprise/ct-faceting'
      ]
    }
}
```

As mentioned above, this package utilizes REST-based API, so it cannot extend `commercetools` integration, which uses GraphQL. However, it uses `commercetools` configuration, so it cannot work independantly from it.

In `middleware.config.js`, add new `ctf` integration:

```javascript{22-31}
//  middleware.config.js
const ctConfiguration = {
  api: {
    uri: '',
    authHost: '',
    projectKey: '',
    clientId: '',
    clientSecret: '',
    scopes: []
  },
  currency: '',
  country: '',
  locale: ''
};

module.exports = {
  integrations: {
    ct: {
      location: '@vue-storefront/commercetools-api/server',
      configuration: ctConfiguration
    },
    ctf: {
      location: '@vsf-enterprise/ct-faceting/server',
      configuration: {
        ...ctConfiguration,
        faceting: {
          host: 'https://api.commercetools.com'
        },
        // Optional faceting configuration (see below)
      }
    }
  }
};
```

Then, register `@vsf-enterprise/ct-faceting/nuxt` in `buildModules` in `nuxt.config.js`:

```javascript{4-6}
// nuxt.config.js
export default {
  buildModules: [
    ['@vsf-enterprise/ct-faceting/nuxt', {
      // Optional faceting configuration (see below)
    }]
  ]
};
```

Middleware integration and Nuxt.js module accept optional faceting configuration. In other for it to work properly, both should be configured identically.

```javascript
{
  pageOptions: [20, 50, 100],
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

Finally, we need to replace the import of `useFacet` and `facetGetters` everywhere they are used from `@vue-storefront/commercetools` to `@vsf-enterprise/ct-faceting`:

```javascript
// Before
import { /* other imports */, useFacet, facetGetters } from '@vue-storefront/commercetools';

// After
import { /* other imports */ } from '@vue-storefront/commercetools';
import { useFacet, facetGetters } from '@vsf-enterprise/ct-faceting';
```

## Examples

Example of the category page browsing.

```js
import { useFacet, facetGetters } from '@vue-storefront/your-integration';

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
