# useSearch composable

`useSearch` composition API function allows searching for products. This function returns the following values:

- `search` - the main querying function that is used to search products from the eCommerce platform and populate the `products` object with the result. Every time you invoke this function API request is made. This method accepts a single `params` object
    - The `params` has the following options:
        - `first` (Int) Returns up to the first `n` elements from the list.
        - `sortKey` (String) The key to sorting results by. Available values are VENDOR, CREATED_AT, ID, PRICE, PRODUCT_TYPE, RELEVANCE, TITLE, UPDATED_AT, BEST_SELLING.
        - `reverse` (Boolean) Whether or not to reverse the sort order of the results.
        - `query` (String) A query string.
- `searchResults: Product[]` - the main data object that contains an array of categories fetched by `search` method

```typescript
export type Maybe<T> = T | null;

export type Image = {
  id: Maybe<string>;
  src: Maybe<string>;
  altText: Maybe<string>;
}

export type Price = {
  amount: Maybe<number>;
  currencyCode: Maybe<string>;
}

export type Option = {
  name: Maybe<string>;
  value: Maybe<any>;
}

export type ProductVariant = {
  __typename?: 'ProductVariant';
  _id?: Maybe<Scalars['String']>;
  _description: Maybe<Scalars['String']>;
  _descriptionHtml: Maybe<Scalars['String']>;
  _slug: Maybe<Scalars['String']>;
  _categoriesRef: string[];
  name: Maybe<Scalars['String']>;
  images: Maybe<Scalars['Array']>;
  product?: Maybe<Scalars['Array']>;
  options: Maybe<Scalars['Array']>;
  variantBySelectedOptions?: Maybe<Scalars['Array']>;
  _coverImage: Maybe<Scalars['String']>;
  price: {
    original: number;
    current: number;
  };
  variants?: Maybe<Scalars['Array']>;
  available?: Maybe<Scalars['Boolean']>;
  productType: Maybe<Scalars['String']>;
  _availableForSale?: Maybe<Scalars['Boolean']>;
}

export type Product = {
  id: Maybe<string>;
  handle: Maybe<string>;
  images: Maybe<Image[]>;
  options: Maybe<Option[]>;
  productType: Maybe<string>;
  publishedAt: Maybe<any>;
  title: Maybe<string>;
  description: Maybe<string>;
  descriptionHtml: Maybe<string>;
  updatedAt: Maybe<any>;
  createdAt: Maybe<any>;
  availableForSale: Maybe<boolean>;
  variants: Maybe<ProductVariant[]>;
  vendor: Maybe<string>;
}
```
- `loading` - a reactive object containing information about the loading state of your `search` method

## Examples

```javascript
import { onSSR } from '@vue-storefront/core';
import { useSearch } from '@vue-storefront/shopify';

export default {
  setup(props, context) {
    const { search, searchResults } = useSearch();
    
    const searchQuery = ref("");
    const productsFound = computed(() => searchResults.value?.products);
    
    const onSearchQueryChanged = value => {
      searchQuery.value = value;
      if (value.length > 2) {
        search({ term: searchQuery.value });
      }
    };

    onSSR(async () => {
      await search({ term: "" });
    });

    return {
      productsFound,
      searchQuery,
      searchResults,
      onSearchQueryChanged
    };
  }
};
```
