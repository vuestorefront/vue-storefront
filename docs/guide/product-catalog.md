# Product Catalog

In Vue Storefront there are two composables available that you can use to interact with product catalog - `useProduct` and `useFacet`. The former should be used to work with a single product and its variants while the latter is for complex product listings with filtering and sorting.


## Fetching a single product and it's variants with `useProduct`

`useProduct` composable is meant to be used primarily on Product Details Page to display information about a single product and its variants.

You can fetch the product and its variants with `search` method. The response will be saved in `products` object and contain at least an array of product variants.

```js
import { useProduct } from '{INTEGRATION}'
import { onSSR } from '@vue-storefront/core'
// ...

export default {
  setup () {
    const { products, search } = useProduct()

    onSSR(async () => {
      await search(searchParams) // populates 'products' with the result
    })
    
    return {
      products
    }
  }
}

```
### Using `getFiltered` to extract product list

In some platforms `products` object is containing not only a list of products but also some additional metadata like products count. In such cases you can use `getFiltered` getter without parameters to extract only the products list.

```ts
import { productGetters } from '{INTEGRATION}'

export default {
  setup () {
    // ...

    const list = computed(() => productGetters.getFiltered(products.value));

    return {
      list
    }
  }
}
```

### Using `getFiltered` to select the Master Variant

Each of Product Variants returned by `getFiltered` is a single product configuration.

In most of the eCommerce backends there is so-called _Master Variant_. You can think about this as a default configuration for your product that is displayed to the user if he/she havn't selected any other configuration yet (eg. `red` + `M` for t-shirt ). If platform is not supporting master variants it's either the first one or there is a stub with `null` as configurable attributes.

We will use the `getFiltered` getter to filter out the other variants from the `products` object and keep only the one that we need:

```ts
const masterVariant = computed(() => productGetters.getFiltered(products.value, { master: true })[0]);
```

### Using `getFiltered` to select the product configuration

The same way we've used `getFiltered` to select the Master Variant we can use it to select other variants.

```js
const selectedVariant = computed(() => productGetters.getFiltered(products.value, { attributes })[0]);
```

## Fetching a list of products and filters with `useFacet`

Faceting is the way of searching and classifying records, allowing users to browse the catalog data.

Each facet is the unit that refines the results over multiple dimensions at a time. Considering the clothing shop, we can distinguish multiple dimensions such as brand, size, color and so on. The particular value of that dimension is a facet, for example `color: red`, `size: xl etc`.

![faceting sechema](./../images/faceting.jpg)


You can fetch all the data needed for a Product Details Page such as products, sorting options, filters and pagination with a single call of a`search` method. The search result will be saved in `result` object.

You can extract certain information from `result` object using `facetGetters`:

```ts
setup (props, context) {
  const { result, search, loading } = useFacet();

  // the products that were found
  const products = computed(() => facetGetters.getProducts(result.value));

  // corresponding category tree
  const categoryTree = computed(() => facetGetters.getCategoryTree(result.value));

  // related breadcrumbs
  const breadcrumbs = computed(() => facetGetters.getBreadcrumbs(result.value));

  // sort options
  const sortBy = computed(() => facetGetters.getSortOptions(result.value));

  // available facets (grouped)
  const facets = computed(() => facetGetters.getGrouped(result.value));

  // pagination options
  const pagination = computed(() => facetGetters.getPagination(result.value));

  onSSR(async () => {
    // triggering a search based on criteria available in url query eg. ?colo=red&sortBy=latest
    await search(searchParams);
  });
}
```
