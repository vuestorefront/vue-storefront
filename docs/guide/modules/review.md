# Cart module

This module contains all the logic, components and store related to review operations.

## Components

### AddReview.ts

This component represents a single button that when pressed adds a review.

**Methods**

- `addReview(review)` - adds review to the product.

### Review

Product page with reviews

**Computed**

- `reviews` - array of reviews that are currently for the product

## Store

Review Store is designed to handle all actions related product reviews.

### State

```js
  state: {
    items: [] // it is properly namespaced
  },
```

The review state data:

- `items` - reviews

### Events

The following events are published from `cart` store:

- `EventBus.$emit('notification-progress-start', Adding a review ...)` - fired to show review is being added

- `EventBus.$emit('notification-progress-stop')` - the event fired after review is submitted for moderation

### Actions

The cart store provides following public actions:

#### `serverTokenClear (context)`

Helper method used to clear the current server cart id (used for cart synchronization)

#### `clear (context)`

This method is called after order has been placed to empty the `cartItems` collection and create the new server cart when the `cart.synchronize_totals` is set to true

#### `save (context)`

Method used to save the cart to the `localForage` browser collection

#### `serverPull (context, { forceClientState = false })`

This method is used to synchronize the current state of the cart items back and forth between server and current client state. When the `forceClientState` is set to false the communication is one-way only (client -> server). This action is called automatically on any shopping cart change when the `cart.synchronize` is set to true.

#### `serverTotals (context, { forceClientState = false })`

Method is called whenever the cart totals should have been synchronized with the server (after `serverPull`). This method overrides local shopping cart grand totals and specific item values (for example prices after discount).

#### `serverCreate (context, { guestCart = false })`

Action is dispatched to create the server cart and store the cart id (for further synchronization)

#### `serverUpdateItem (context, cartItem)`, `serverDeleteItem (context, cartItem)`

Actions called whenever the shopping cart item should be synchronized with server side (pushes changes to the server). Basically this method is called within [`servercart-after-pulled`](https://github.com/DivanteLtd/vue-storefront/blob/c43b2966a9ae10661e5a62b10445403ed9789b32/core/store/modules/cart/index.js#L45)

#### `load (context)`

This method loads the cart items from `localForage` browser state management.

#### `getItem ({ commit, dispatch, state }, sku)`

This action is used for search the particular item in the shopping cart (by SKU)

#### `addItem ({ commit, dispatch, state }, { productToAdd, forceServerSilence = false })`

This action is used to add the `productToAdd` to the cart, if `config.cart.synchronize` is set to true the next action subsequently called will be `serverPull` to synchronize the cart. The event `cart-before-add` is called whenever new product lands in the shopping cart. The option `forceServerSilence` is used to bypass the server synchronization and it's used for example then the item is added during the ... sync process to avoid circular synchronization cycles.

#### `removeItem ({ commit, dispatch }, product)`

As you may imagine :) This action simply removes the product from the shopping cart and synchronizes the server cart when set. You must at least specify the `product.sku`.

#### `removeNonConfirmedVariants ({ commit, dispatch }, product)`

This action simply removes the non-confirmed product from the shopping cart and synchronizes the server cart when set. You must at least specify the `product.sku`.

#### `updateQuantity ({ commit, dispatch }, { product, qty, forceServerSilence = false })`

This method is called whenever user changes the quantity of product in the cart (called from `Microcart.vue`). The parameter `qty` is the new quantity of product and by using `forceServerSilence` you may control if the server cart synchronization is being executed or not.

#### `updateItem ({ commit }, { product })`

Updates item properties.

#### `getPaymentMethods (context)`

Gets a list of payment methods from the backend and saves them to `cart.payment` store state.

#### `getShippingMethods (context, address)`

Gets a list of shipping methods from the backend and saves them to `cart.shipping` store state. Country ID is passed to this method in a mandatory `address` parameter.

#### `refreshTotals (context, methodsData)`

This method sends request to the backend to collect cart totals. It calls different backend endpoints depending on if payment and shipping methods information is available or not.

### Getters

All state members should have been accessed only by getters. Please take a look at the state reference for data formats

```js
const getters = {
  current: state => state.current,
  list: state => state.list,
};
```
