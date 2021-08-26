# Filtering products

Filtering products is an important part of any products listing page. To ensure the best developer experience and consistency between integrations (because filters have to be delivered to the theme in a unified form) we need to provide a common way to retrieve available filters.

## New APIs

### Modify `useProduct` composable

Since there are several factors that the filters depend on (product's type, category, available products, their attributes) and the set of filters might be dynamic, this feature should introduce a new field in the `useProduct` composable, `availableFilters`, like in the example below.

**New interface**:

```ts
export interface UseProduct<PRODUCT, PRODUCT_FILTERS> {
  products: ComputedProperty<PRODUCT[]>;
  availableFilters: ComputedProperty<PRODUCT_FILTERS>;
  search: (params: {
    perPage?: number;
    page?: number;
    sort?: any;
    term?: any;
    filters?: PRODUCT_FILTERS;
    [x: string]: any;
  }) => Promise<void>;
  loading: ComputedProperty<boolean>;
  [x: string]: any;
}
```

**`UseProductFactoryParams` interface**

Loading filters, their possible values, counts, etc. will require an integration-specific logic that will be part of the search function, so the factory params interface needs a new interface for search function result:

```ts
export interface ProductsSearchResult<PRODUCT, PRODUCT_FILTERS> {
  data: PRODUCT[],
  total: number,
  availableFilters?: PRODUCT_FILTERS;
}
```

## Migration process

- Add `PRODUCT_FILTER` type to `useProduct` on integration side.
- Implement getting available filters in `searchProducts` factory param (optional).
- Implement handling filters in products search (optional).
