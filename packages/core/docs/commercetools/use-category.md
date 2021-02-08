---
platform: Commercetools
---

# Category

[[toc]]

## Features

`useCategory` composition API function is responsible for fetching a list of categories. A common usage scenario for this composable is navigation.

## API

`useCategory` contains the following properties:

- `search` - a main querying function that is used to query categories from eCommerce platform and populate the `categories` object with the result. Every time you invoke this function API request is made. This method accepts a single `params` object.

- `categories` - a main data object that contains an array of categories fetched by `search` method,

- `loading` - a reactive object containing information about loading state of your `search` method.

- `error` - reactive object containing the error message, if `search` failed for any reason.

## Getters

Because `categories` property is a raw response, it's recommended to use `categoryGetters` for accessing any data from it. It includes following helper functions:

- `getTree` - returns category tree.

Interface for the above getter looks like this:

```ts
interface CategoryGetters<CATEGORY> {
  getTree: (category: CATEGORY) => AgnosticCategoryTree | null;
  getBreadcrumbs?: (category: CATEGORY) => AgnosticBreadcrumb[];
  [getterName: string]: any;
}
```

## Examples

```js
import { useCategory } from '@vue-storefront/commercetools';
import { onSSR } from '@vue-storefront/core'

export default {
  setup () {
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
