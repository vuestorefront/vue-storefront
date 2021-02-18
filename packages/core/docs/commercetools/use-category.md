# `useCategory`

## Features

`useCategory` composable is responsible for fetching a list of categories. A common usage scenario for this composable is navigation.

## API

- `search` - a main querying function that is used to query categories from eCommerce platform and populate the `categories` object with the result. Every time you invoke this function API request is made. This method accepts a single `params` object. The `params` has the following options:

    - `searchParams`
      
      - `id: string`
      - `slug: string`
    
    - `customQuery?: CustomQuery` 
    
```ts
type CustomQuery = (query, variables) => {
  query?;
  variables?;
}
```

- `categories: Category[]` - a main data object that contains an array of categories fetched by `search` method.

```ts
type Category = {
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
  productCount: Scalars["Int"];
  stagedProductCount: Scalars["Int"];
  childCount: Scalars["Int"];
  children?: Maybe<Array<Category>>;
  createdAt: Scalars["DateTime"];
  lastModifiedAt: Scalars["DateTime"];
  assets: Array<Asset>;
  customFieldsRaw?: Maybe<Array<RawCustomField>>;
  customFields?: Maybe<Type>;
  custom?: Maybe<CustomFieldsType>;
  createdBy?: Maybe<Initiator>;
  lastModifiedBy?: Maybe<Initiator>;
  customFieldList?: Maybe<Array<CustomField>>;
}
```

- `loading` - a reactive object containing information about loading state of your `search` method.

- `error` - reactive object containing the error message, if `search` failed for any reason.

## Getters

- `getTree` - returns category tree.

```ts
interface CategoryGetters {
  getTree: (category: Category) => AgnosticCategoryTree | null;
}

interface AgnosticCategoryTree {
  label: string;
  slug?: string;
  items: AgnosticCategoryTree[];
  isCurrent: boolean;
  count?: number;
  [x: string]: unknown;
}
```

## Example

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
