---
platform: Commercetools
---

# useProduct

[[toc]]

## Features

`useProduct` composition API function is responsible for fetching a list of products.

## API

`useProduct` contains following properties:

- `search` - a main querying function that is used to query products from eCommerce platform and populate the `products` object with the result. Every time you invoke this function API request is made. This method accepts a single `params` object.
  
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
- `products` - a main data object that contains an array of products fetched by `search` method,

```ts
type ProductVariant = {
  __typename?: "ProductVariant";
  id: Scalars["Int"];
  key?: Maybe<Scalars["String"]>;
  sku?: Maybe<Scalars["String"]>;
  prices?: Maybe<Array<ProductPrice>>;
  /** Returns a single price based on the price selection rules. */
  price?: Maybe<ProductPrice>;
  images: Array<Image>;
  assets: Array<Asset>;
  availability?: Maybe<ProductVariantAvailabilityWithChannels>;
  /** This field contains non-typed data. Consider using `attributes` as a typed alternative. */
  attributesRaw: Array<RawProductAttribute>;
  /** Product attributes */
  attributes: ProductType;
  /** Product attributes are returned as a list instead of an object structure. */
  attributeList: Array<Attribute>;
}
```

- `loading` - a reactive object containing information about loading state of your `search` method.

- `error` - reactive object containing the error message, if `search` failed for any reason.

## Getters

Because `product` property is a raw response, it's recommended to use `productGetters` for accessing any data from it. It includes following helper functions:

- `getName` - returns product name.

- `getSlug` - returns product slug.

- `getPrice` - returns product price.

- `getGallery` - returns product gallery.

- `getCoverImage` - returns cover image of product.

- `getFiltered` - returns filtered product.

- `getAttributes` - returns product attributes.

- `getDescription` - returns product description.

- `getCategoryIds` - returns all product categories.

- `getId` - returns product ID.

- `getFormattedPrice` - returns product price with currency sign.

- `getTotalReviews` - returns total number of reviews product has. 

- `getAverageRating` - returns average rating from all reviews.

Interface for the above getter looks like this:

```ts
interface ProductGetters<ProductVariant, ProductVariantFilters> {
  getName: (product: ProductVariant | Readonly<ProductVariant>) => string;
  getSlug: (product: ProductVariant | Readonly<ProductVariant>) => string;
  getPrice: (product: ProductVariant | Readonly<ProductVariant>) => AgnosticPrice;
  getGallery: (product: ProductVariant) => AgnosticMediaGalleryItem[];
  getCoverImage: (product: ProductVariant) => string;
  getFiltered: (products: ProductVariant[], filters: ProductVariantFilters | any = {}) => ProductVariant[];
  getAttributes: (products: ProductVariant[] | ProductVariant, filterByAttributeName?: string[]) => Record<string, AgnosticAttribute | string>;
  getDescription: (product: ProductVariant) => string;
  getCategoryIds: (product: ProductVariant) => string[];
  getId: (product: ProductVariant) => string;
  getFormattedPrice: (price: number) => string;
  getTotalReviews: (product: ProductVariant) => number;
  getAverageRating: (product: ProductVariant) => number;
}
```

## Examples

```js
import { useProduct, productGetters } from '@vue-storefront/commercetools';
import { onSSR } from '@vue-storefront/core'

export default {
  setup () {
    const { products, search, loading, error } = useProduct('<UNIQUE_ID>');

    onSSR(async () => {
      await search({ slug: 'super-t-shirt' })
    })

    return {
      loading,
      error,
      product: computed(() => productGetters.getFiltered(products.value, { master: true, attributes: context.root.$route.query })[0]),
      option: computed(() => productGetters.getAttributes(products.value, ['color', 'size'])),
      configuration: computed(() => productGetters.getCategoryIds(product.value))
    }
  }
}
```
