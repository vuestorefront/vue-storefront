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

```ts
type Category = Versioned & {
  __typename?: "Category";
  id: Scalars["String"];
  key?: Maybe<Scalars["String"]>;
  version: Scalars["Long"];
  name?: Maybe<Scalars["String"]>;
  nameAllLocales: Array<LocalizedString>;
  description?: Maybe<Scalars["String"]>;
  descriptionAllLocales?: Maybe<Array<LocalizedString>>;
  slug?: Maybe<Scalars["String"]>;
  slugAllLocales: Array<LocalizedString>;
  ancestorsRef: Array<Reference>;
  ancestors: Array<Category>;
  parentRef?: Maybe<Reference>;
  parent?: Maybe<Category>;
  orderHint: Scalars["String"];
  externalId?: Maybe<Scalars["String"]>;
  metaTitle?: Maybe<Scalars["String"]>;
  metaKeywords?: Maybe<Scalars["String"]>;
  metaDescription?: Maybe<Scalars["String"]>;
  /** Number of a products in the category subtree. */
  productCount: Scalars["Int"];
  /** Number of staged products in the category subtree. */
  stagedProductCount: Scalars["Int"];
  /** Number of direct child categories. */
  childCount: Scalars["Int"];
  /** Direct child categories. */
  children?: Maybe<Array<Category>>;
  createdAt: Scalars["DateTime"];
  lastModifiedAt: Scalars["DateTime"];
  assets: Array<Asset>;
  /** This field contains non-typed data. Consider using `customFields` as a typed alternative. */
  customFieldsRaw?: Maybe<Array<RawCustomField>>;
  /** This field would contain type data */
  customFields?: Maybe<Type>;
  custom?: Maybe<CustomFieldsType>;
  createdBy?: Maybe<Initiator>;
  lastModifiedBy?: Maybe<Initiator>;
  /** Custom fields are returned as a list instead of an object structure. */
  customFieldList?: Maybe<Array<CustomField>>;
}
```

- `loading` - a reactive object containing information about loading state of your `search` method.

- `error` - reactive object containing the error message, if `search` failed for any reason.

## Getters

Because `categories` property is a raw response, it's recommended to use `categoryGetters` for accessing any data from it. It includes following helper functions:

- `getTree` - returns category tree.

Interface for the above getter looks like this:

```ts
interface CategoryGetters<Category> {
  getTree: (category: Category) => AgnosticCategoryTree | null;
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
