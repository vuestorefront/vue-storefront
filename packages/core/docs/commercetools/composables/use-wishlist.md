# `useWishlist` <Badge text="Enterprise" type="info" />

> This feature is a part of our commercial offering and does not exist in Open Source version of commercetools integration. Read more about a Vue Storefront Enterprise Cloud [here](https://www.vuestorefront.io/cloud)

## Features

`useWishlist` composable is responsible, for integrating with wishlist from Commercetools. It allows to:

- fetch products from wishlist
- add products to wishlist
- remove products from wishlist
- check if product is on wishlist

## API

- `wishlist: Wishlist` - a main data object.

```ts
type ShoppingList = {
  __typename?: "ShoppingList";
  key?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  nameAllLocales: Array<LocalizedString>;
  description?: Maybe<Scalars["String"]>;
  descriptionAllLocales?: Maybe<Array<LocalizedString>>;
  slug?: Maybe<Scalars["String"]>;
  slugAllLocales?: Maybe<Array<LocalizedString>>;
  customerRef?: Maybe<Reference>;
  customer?: Maybe<Customer>;
  anonymousId?: Maybe<Scalars["String"]>;
  lineItems: Array<ShoppingListLineItem>;
  textLineItems: Array<TextLineItem>;
  custom?: Maybe<CustomFieldsType>;
  deleteDaysAfterLastModification?: Maybe<Scalars["Int"]>;
  id: Scalars["String"];
  version: Scalars["Long"];
  createdAt: Scalars["DateTime"];
  lastModifiedAt: Scalars["DateTime"];
  createdBy?: Maybe<Initiator>;
  lastModifiedBy?: Maybe<Initiator>;
}

type Wishlist = ShoppingList;
```

- `load` - function used to retrieve wishlist products. When invoked, it requests data from the API and populates `wishlist` property. This method accepts a single `params` object. The `params` has the following option:

    - `customQuery?: CustomQuery`
    
```ts
type CustomQuery = (query, variables) => {
  query?;
  variables?;
}
```

- `addItem` - function used to add new product to wishlist. When invoked, it submits data to the API and populates `wishlist` property with updated information. This method accepts a single `params` object. The `params` has the following options:

    - `product: ProductVariant`
    
    - `customQuery?: customQuery`
  
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

type CustomQuery = (query, variables) => {
  query?;
  variables?;
}
```

- `removeItem` - function that removes products from the wishlist. It submits data to the API and populates updated `wishlist` property. This method accepts a single `params` object. The `params` has the following options:

  - `product: LineItem`

  - `customQuery?: customQuery`

```ts
type LineItem = {
  __typename?: "LineItem";
  id: Scalars["String"];
  productId: Scalars["String"];
  name?: Maybe<Scalars["String"]>;
  nameAllLocales: Array<LocalizedString>;
  productSlug?: Maybe<Scalars["String"]>;
  productType?: Maybe<ProductTypeDefinition>;
  productTypeRef?: Maybe<Reference>;
  variant?: Maybe<ProductVariant>;
  price: ProductPrice;
  taxedPrice?: Maybe<TaxedItemPrice>;
  totalPrice?: Maybe<Money>;
  quantity: Scalars["Long"];
  state: Array<ItemState>;
  taxRate?: Maybe<TaxRate>;
  supplyChannel?: Maybe<Channel>;
  supplyChannelRef?: Maybe<Reference>;
  distributionChannel?: Maybe<Channel>;
  distributionChannelRef?: Maybe<Reference>;
  discountedPricePerQuantity: Array<DiscountedLineItemPriceForQuantity>;
  lineItemMode: LineItemMode;
  priceMode: LineItemPriceMode;
  customFieldsRaw?: Maybe<Array<RawCustomField>>;
  customFields?: Maybe<Type>;
  custom?: Maybe<CustomFieldsType>;
  shippingDetails?: Maybe<ItemShippingDetails>;
  inventoryMode?: Maybe<ItemShippingDetails>;
  customFieldList?: Maybe<Array<CustomField>>;
}

type CustomQuery = (query, variables) => {
  query?;
  variables?;
}
```

- `clear` - function that removes all products from the wishlist and populates clear `wishlist` property.

- `isOnWishlist` - function that checks if product is on the wishlist. It returns boolean value. This method accepts a single `params` object. The `params` has the following option:

  - `product: ProductVariant`
  
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

- `loading: boolean` - a reactive object containing information about loading state of the cart.

- `error: UseWishlistErrors` - reactive object containing the error message, if some properties failed for any reason.

```ts
interface UseWishlistErrors {
  addItem: Error;
  removeItem: Error;
  load: Error;
  clear: Error;
}
```

## Getters

- `getItems` - returns list of products on wishlist

- `getItemName` - returns product's name from wishlist.

- `getItemImage` - returns product's image from wishlist.

- `getItemPrice` - returns product's price from wishlist.

- `getItemQty` - returns quantity of product which is on wishlist.

- `getItemAttributes` - returns product variant attribute chosen by its name.

- `getItemSku` - returns product's SKU code.

- `getTotals` - returns price of products.

- `getTotalItems` - returns amount of all items that are currently on wishlist.

- `getFormattedPrice` - returns price in formatted manner taking into account local specifics.

```typescript
interface WishlistGetters {
  getTotals: (wishlist: Wishlist) => AgnosticTotals;
  getItems: (wishlist: Wishlist) => ShoppingListLineItem[];
  getItemName: (product: ShoppingListLineItem) => string;
  getItemImage: (product: ShoppingListLineItem) => string;
  getItemPrice: (product: ShoppingListLineItem) => AgnosticPrice;
  getItemQty: (product: ShoppingListLineItem) => number;
  getItemAttributes: (product: ShoppingListLineItem, filterByAttributeName?: string[]) => ({});
  getItemSku: (product: ShoppingListLineItem) => string;
  getTotalItems: (wishlist: Wishlist) => number;
  getFormattedPrice: (price: number) => string;
};

interface AgnosticTotals {
  total: number;
  subtotal: number;
  special?: number;
  [x: string]: unknown;
}

interface AgnosticPrice {
  regular: number | null;
  special?: number | null;
}

type Wishlist = {
  __typename?: "ShoppingList";
  key?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  nameAllLocales: Array<LocalizedString>;
  description?: Maybe<Scalars["String"]>;
  descriptionAllLocales?: Maybe<Array<LocalizedString>>;
  slug?: Maybe<Scalars["String"]>;
  slugAllLocales?: Maybe<Array<LocalizedString>>;
  customerRef?: Maybe<Reference>;
  customer?: Maybe<Customer>;
  anonymousId?: Maybe<Scalars["String"]>;
  lineItems: Array<ShoppingListLineItem>;
  textLineItems: Array<TextLineItem>;
  custom?: Maybe<CustomFieldsType>;
  deleteDaysAfterLastModification?: Maybe<Scalars["Int"]>;
  id: Scalars["String"];
  version: Scalars["Long"];
  createdAt: Scalars["DateTime"];
  lastModifiedAt: Scalars["DateTime"];
  createdBy?: Maybe<Initiator>;
  lastModifiedBy?: Maybe<Initiator>;
}

type ShoppingListLineItem = {
  __typename?: "ShoppingListLineItem";
  id: Scalars["String"];
  productId: Scalars["String"];
  variantId?: Maybe<Scalars["Int"]>;
  productTypeRef: Reference;
  productType: ProductTypeDefinition;
  quantity: Scalars["Int"];
  addedAt: Scalars["DateTime"];
  name?: Maybe<Scalars["String"]>;
  nameAllLocales: Array<LocalizedString>;
  deactivatedAt?: Maybe<Scalars["DateTime"]>;
  custom?: Maybe<CustomFieldsType>;
  productSlug?: Maybe<Scalars["String"]>;
  variant?: Maybe<ProductVariant>;
}
```

## Example

```typescript
import { onSSR } from '@vue-storefront/core';
import { useWishlist, wishlistGetters } from '@vsf-enterprise/commercetools';

export default {
  setup() {
    const { load: loadWishlist } = useWishlist();

    const wishlistItems = computed(() => wishlistGetters.getItems());

    // If you're using Nuxt or any other framework for Universal Vue apps
    onSSR(async () => {
      await loadWishlist();
    });

    return {
      loadWishlist,
      wishlistItems
    };
  }
};
```
