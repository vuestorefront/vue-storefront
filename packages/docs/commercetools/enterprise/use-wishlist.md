# Wishlist
## Features

`useWishlist` composition API function is responsible for integrating with the wishlist from commercetools. It allows to:

- fetch products from the wishlist
- add products to the wishlist
- remove products from the wishlist
- check if a product is on the wishlist

## API

`useWishlist` contains the following properties:

- `load` - a function used to retrieve wishlist products. When invoked, it requests data from the API and populates the `wishlist` property.

- `addToWishlist` - a function used to add new product to wishlist. When invoked, it submits data to the API and populates the `wishlist` property with updated information.

- `removeFromWishlist` - a function that removes products from the wishlist. It submits data to the API and populates the updated `wishlist` property.

- `clearWishlist` - a function that removes all products from the wishlist and populates clear `wishlist` property.

- `isInWishlist` - a function that checks if a product is on the wishlist. It returns a boolean value.

## Getters

Because `wishlist` property is a raw response with some additional properties, it's recommended to use `wishlistGetters` for accessing any data from it. It includes the following helper functions:

- `getWishlistItems` - returns list of products on wishlist

- `getWishlistItemName` - returns product's name from wishlist.

- `getWishlistItemImage` - returns product's image from wishlist.

- `getWishlistItemPrice` - returns product's price from wishlist.

- `getWishlistItemQty` - returns the quantity of a product that is on the wishlist.

- `getWishlistItemAttributes` - returns product variant attribute chosen by its name.

- `getWishlistItemSku` - returns product's SKU code.

- `getWishlistShippingPrice` - returns a price of products.

- `getWishlistTotalItems` - returns an amount of all items that are currently on the wishlist.

- `getFormattedPrice` - returns price in a formatted manner, taking into account local specifics.

Interface for the above getter looks like this:

```typescript
interface WishlistGetters<Wishlist, ShoppingListLineItem> = {
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

## Usage

When you already installed `@vsf-enterprise/ct-wishlist` as a dependency, there are few minor modifications required to make it work.

The first step is to add `@vsf-enterprise/ct-wishlist` to `build > transpile` array in `nuxt.config.js`.

Then we need to replace the import of `useWishlist` and `wishlistGetters` everywhere they are used from `@vue-storefront/commercetools` to `@vsf-enterprise/ct-wishlist`:

```javascript
// Before
import { /* other imports */, useWishlist, wishlistGetters } from '@vue-storefront/commercetools';

// After
import { /* other imports */ } from '@vue-storefront/commercetools';
import { useWishlist, wishlistGetters } from '@vsf-enterprise/ct-wishlist';
```

## Examples

Fetching products currently on wishlist:

```typescript
import { onSSR } from '@vue-storefront/core';
import { useWishlist, wishlistGetters } from '@vsf-enterprise/ct-wishlist';

export default {
  setup() {
    const { load: loadWishlist } = useWishlist();

    const wishlistItems = computed(() => wishlistGetters.getItems());

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
