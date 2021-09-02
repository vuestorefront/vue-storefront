# useCategory composable

`useCategory` composition API function allows loading the categories. This function returns the following values:

- `search` - a primary querying function that is used to query products from the eCommerce platform and populate the `products` object with the result. Every time you invoke this function API request is made. This method accepts a single `params` object.

    - The `params` has the following options:
        - `id` (String) The id of the collection to fetch.
        - `slug` (String) The handle of the collection to fetch.
        - `customQuery` (Object) An object specifying the query data containing zero or more of:
            - `first` (Int) The relay `first` param. This specifies page size.
            - `sortKey` (String) The key to sorting results by. Available values are ID, TITLE, UPDATED_AT
            - `query` (String) A query string.
            - `reverse` (Boolean) Whether or not to reverse the sort order of the results
        - `withProducts` (Boolean) Fetch collections, including products.
- `categories: Category[]` - a main data object that contains an array of categories fetched by `search` method
```typescript
export type Category = {
  __typename?: 'Category';
  id: string;
  handle: string;
  title: string;
  image: string;
  description: string;
  descriptionHtml: string;
  updatedAt: string;
  products: array;
}
```
- `loading` - a reactive object containing information about the loading state of your `search` method


## Examples

Fetch all collections in the shop, including products.

```javascript
import { useCategory } from '@vue-storefront/shopify';
import { onSSR } from '@vue-storefront/core'

export default {
  setup() {
    const { categories, search, loading } = useCategory('menu-categories');

    onSSR(async () => {
      await search({});
    });

    return {
      categories,
      loading
    }
  }
}
```

Fetch a single collection by slug on the shop, including products.

```javascript

    const { categories, search } = useCategory('categories');

    onSSR(async () => {
      await search({ slug: 'sale' });
    });

    return {
      categories
    };

```
