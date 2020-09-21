# useFacet composable

A composable responsible for (basic) faceting. This implementation rely on GraphQL api which means it not 100% complete faceting as commercetools provide in their dedicated rest-based faceting api. This one based on product and category query provided by `getProduct` and `getCategory` functions from `@vue-storefront/commercetools-api`.

## Search input params

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

## Examples

Using a full working example of the category page browsing.

```js
setup(props, context) {
  const { result, search, loading } = useFacet();
  const products = computed(() => facetGetters.getProducts(result.value));
  const categoryTree = computed(() => facetGetters.getCategoryTree(result.value));
  const breadcrumbs = computed(() => facetGetters.getBreadcrumbs(result.value));
  const sortBy = computed(() => facetGetters.getSortOptions(result.value));
  const facets = computed(() => facetGetters.getGrouped(result.value, ['color', 'size']));
  const pagination = computed(() => facetGetters.getPagination(result.value));

  onSSR(async () => {
    await search(context.$router.history.current.query);
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
