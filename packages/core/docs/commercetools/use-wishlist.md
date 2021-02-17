# `useWishlist` <Badge text="Enterprise" type="info" />

> This feature is a part of our commercial offering and does not exist in Open Source version of commercetools integration. Read more about a Vue Storefront Enterprise Cloud [here](https://www.vuestorefront.io/cloud)

## Features

`useWishlist` composable is responsible, for integrating with wishlist from Commercetools. It allows to:

- fetch products from wishlist
- add products to wishlist
- remove products from wishlist
- check if product is on wishlist

## API

`useWishlist` contains following properties:

- `load` - function used to retrieve wishlist products. When invoked, it requests data from the API and populates `wishlist` property.

- `addToWishlist` - function used to add new product to wishlist. When invoked, it submits data to the API and populates `wishlist` property with updated information.

- `removeFromWishlist` - function that removes products from the wishlist. It submits data to the API and populates updated `wishlist` property.

- `clearWishlist` - function that removes all products from the wishlist and populates clear `wishlist` property.

- `isOnWishlist` - function that checks if product is on the wishlist. It returns boolean value.

## Getters

- `getWishlistItems` - returns list of products on wishlist

- `getWishlistItemName` - returns product's name from wishlist.

- `getWishlistItemImage` - returns product's image from wishlist.

- `getWishlistItemPrice` - returns product's price from wishlist.

- `getWishlistItemQty` - returns quantity of product which is on wishlist.

- `getWishlistItemAttributes` - returns product variant attribute chosen by its name.

- `getWishlistItemSku` - returns product's SKU code.

- `getWishlistShippingPrice` - returns price of products.

- `getWishlistTotalItems` - returns amount of all items that are currently on wishlist.

- `getFormattedPrice` - returns price in formatted manner taking into account local specifics.

```typescript
interface WishlistGetters {
  getTotals: getWishlistTotals,
  getShippingPrice: getWishlistShippingPrice,
  getItems: getWishlistItems,
  getItemName: getWishlistItemName,
  getItemImage: getWishlistItemImage,
  getItemPrice: getWishlistItemPrice,
  getItemQty: getWishlistItemQty,
  getItemAttributes: getWishlistItemAttributes,
  getItemSku: getWishlistItemSku,
  getTotalItems: getWishlistTotalItems,
  getFormattedPrice
};
```

## Example

Fetching products currently on wishlist:

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
