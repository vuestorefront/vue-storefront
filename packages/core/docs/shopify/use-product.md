# useProduct composable

`useProduct` composition API function allows for loading the products. This function returns the following values:

- `search` - the main querying function that is used to query products from the eCommerce platform and populate the `products` object with the result. Every time you invoke this function API request is made. This method accepts a single `params` object.
    - The `params` has the following options:
        - `id` (String) The id of the product to fetch.
            ```javascript
              const id = 'Xk9lM2JkNzFmNzIQ4NTIY4ZDFi9DaGVja291dC9lM2JkN==';
            ```
        - `ids` (String[]) The ids of the products to fetch.
            ```javascript
              const ids = [
                'Xk9lM2JkNzFmNzIQ4NTIY4ZDFi9DaGVja291dC9lM2JkN==', 
                'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0Lzc4NTc5ODkzODQ='
              ];
            ```
        - `slug` (String) The handle of the product to fetch.
            ```javascript
              const slug = 'my-product';
            ```
        - `customQuery` (Object) An object specifying the query data containing zero or more of:
            - `first` (Int) The relay `first` param. This specifies page size.
            - `sortKey` (String) The key to sorting results by. Available values are ID, TITLE, UPDATED_AT
            - `query` (String) A query string.
            - `reverse` (Boolean) Whether or not to reverse the sort order of the results
- `products: Product[]` - the main data object that contains an array of products fetched by `search` method
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

## productGetters
- `getName` - Get product name
- `getSlug` - Get product URL key
- `getPrice` - Return an object `checkSpecialPrice`, it will contains two parameters:
    - `regular` (float) regular price
    - `special` (float) special price
- `getGallery` - Return an array of object `AgnosticMediaGalleryItem[]`, which contains the following parameters:
    - `small` (string) image source URL
    - `normal` (string) image source URL
    - `big` (string) image source URL
- `getCoverImage` - Get product's mail image.
- `getFiltered` - Return the array of products.
- `getAttributes` - Return the product variants.
- `getOptions` - Get product custom options
- `getDescription` - Retrieve product description 
- `getCategoryIds` - Get category ids
- `getId` - Get product id
- `getFormattedPrice` - Return product price with currency sign 
- `getStatus` - Return true if product is available
- `hasSpecialPrice` - Return true if product product has discounted price
- `isInWishlist` -  Return true if product was added to wishlist 
- `getBreadcrumbs` - Prepared bread crumbs for the product.
- `getVendor` - Get vendor name of product.

## Examples

Fetch a single product by handle of the product.
```typescript
import { computed } from '@vue/composition-api';
import { onSSR } from '@vue-storefront/core';
import { useProduct, productGetters } from '@vue-storefront/shopify';

export default {
  setup(props, context) {
    const { products, search } = useProduct('products');
    const { slug } = context.root.$route.params;
    
    const product = computed(() => productGetters.getFiltered(products.value));

    onSSR(async () => {
      await search({ slug });
    });

    return {
      product
    };
  }
};
```

Fetch best selling products.
```typescript
import { useProduct } from '@vue-storefront/shopify';
import { onSSR } from '@vue-storefront/core';
export default {
  setup() {
    const { products, search: productsSearch } = useProduct('categoryProducts');

    const productsSearchParams = {
      customQuery: {
        first: 8,
        sortKey: 'bestSelling',
        reverse: false
      }
    };
        
    onSSR(async () => {
      await productsSearch(productsSearchParams);
    });

    return {
      products,
    }
  }
}
```
