# `useWishlist` <Badge text="Enterprise" type="info" />

> This feature is a part of our commercial offering and does not exist in Open Source version of commercetools integration. Read more about a Vue Storefront Enterprise Cloud [here](https://www.vuestorefront.io/cloud)

## Features

`useWishlist` composable is responsible, for integrating with wishlist from Commercetools. It allows to:

- fetch products from wishlist
- add products to wishlist
- remove products from wishlist
- check if product is on wishlist

## API

- `load` - function used to retrieve wishlist products. When invoked, it requests data from the API and populates `wishlist` property.

- `addToWishlist` - function used to add new product to wishlist. When invoked, it submits data to the API and populates `wishlist` property with updated information.

- `removeFromWishlist` - function that removes products from the wishlist. It submits data to the API and populates updated `wishlist` property.

- `clearWishlist` - function that removes all products from the wishlist and populates clear `wishlist` property.

- `isOnWishlist` - function that checks if product is on the wishlist. It returns boolean value.

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

type Wishlist = Versioned & {
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
import { useWishlist, wishlistGetters } from '@vsf-enterprise/ct-wishlist';

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
