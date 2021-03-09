# `useBilling`

## Features

`useBilling` composable can be use to:

* Saving billing address for the current cart.
* Loading billing address for the current cart.

## API

- `save` - a main querying function that is used to query products from eCommerce platform and populate the `products` object with the result. Every time you invoke this function API request is made. This method accepts a single `params` object. The `params` has the following options:
 
    - `billingDetails: Address`

    - `customQuery?: CustomQuery`

```ts
type Address = {
  __typename?: "Address";
  id?: Maybe<Scalars["String"]>;
  title?: Maybe<Scalars["String"]>;
  salutation?: Maybe<Scalars["String"]>;
  firstName?: Maybe<Scalars["String"]>;
  lastName?: Maybe<Scalars["String"]>;
  streetName?: Maybe<Scalars["String"]>;
  streetNumber?: Maybe<Scalars["String"]>;
  additionalStreetInfo?: Maybe<Scalars["String"]>;
  postalCode?: Maybe<Scalars["String"]>;
  city?: Maybe<Scalars["String"]>;
  region?: Maybe<Scalars["String"]>;
  state?: Maybe<Scalars["String"]>;
  country: Scalars["Country"];
  company?: Maybe<Scalars["String"]>;
  department?: Maybe<Scalars["String"]>;
  building?: Maybe<Scalars["String"]>;
  apartment?: Maybe<Scalars["String"]>;
  pOBox?: Maybe<Scalars["String"]>;
  contactInfo: AddressContactInfo;
  phone?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["String"]>;
  additionalAddressInfo?: Maybe<Scalars["String"]>;
  externalId?: Maybe<Scalars["String"]>;
  key?: Maybe<Scalars["String"]>;
};

type CustomQuery = Record<string, string>
```
- `products: ProductVariant[]` - a main data object that contains an array of products fetched by `search` method.

```ts
type ProductVariant = {
  __typename?: "ProductVariant";
  id: Scalars["Int"];
  key?: Maybe<Scalars["String"]>;
  sku?: Maybe<Scalars["String"]>;
  prices?: Maybe<Array<ProductPrice>>;
  price?: Maybe<ProductPrice>;
  images: Array<Image>;
  assets: Array<Asset>;
  availability?: Maybe<ProductVariantAvailabilityWithChannels>;
  attributesRaw: Array<RawProductAttribute>;
  attributes: ProductType;
  attributeList: Array<Attribute>;
}
```

- `loading: boolean` - a reactive object containing information about loading state of your `search` method.

- `error: UseProductErrors` - reactive object containing the error message, if `search` failed for any reason.

```ts
interface UseProductErrors {
  search?: Error;
}
```

## Getters

We do not provide getters for checkout and its parts.

## Example

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
