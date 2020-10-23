# useWishlist composable

`useWishlist` composition API function is responsible, as its name suggests, for interactions with wishlist in your eCommerce. This function returns following values:

## Properties

`useWishlist` contains following properties:

- `loadWishlist` - function used to retrieve wishlist products. When invoked, it requests data from the API and populates `wishlist` property.

- `addToWishlist` - function used to add new product to wishlist. When invoked, it submits data to the API and populates `wishlist` property with updated information.

<!-- <Content slot-key="add-params" /> -->

- `removeFromWishlist` - function that removes products from the wishlist. It submits data to the API and populates updated `wishlist` property.

- `clearWishlist` - function that removes all products from the wishlist and populates clear `wishlist` property.

- `isOnWishlist` - function that checks if product is on the wishlist. It returns boolean value.


## Getters

Because `wishlist` property is a raw response with some additional properties, it's recommended to use `wishlistGetters` for accessing any data from it. It includes following helper functions:

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

<Content slot-key="usage" />

