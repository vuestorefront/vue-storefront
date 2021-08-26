# Review module

This module contains all the logic, components and store related to cart operations.

## Components

### AddToCart

This component represents a single button that when pressed adds a product to cart.

**Props**

- `product` - product that'll be added to cart

**Methods**

- `addToCart(product)` - adds passed product to the cart. By default correlates with `product` prop

### Microcart

User cart with a products list and price summary.

**Computed**

- `productsInCart` - array of products that are currently in the cart
- `appliedCoupon` - return applied cart coupon or `false` if no coupon was applied
- `totals` - cart totals
- `isMicrocartOpen` - returns `true` if microcart is open

**Methods**

- `applyCoupon(code)` - applies cart coupon
- `removeCoupon` - removes currently applied cart coupon
- `toggleMicrocart` - open/close microcart

### MicrocartButton

Component responsible for opening/closing Microcart

**Computed**

- `quantity` - number of products in cart

**Methods**

- `toggleMicrocart` - open/close microcart

### Product

Component representing product in microcart. Allows to modify it's quantity or remove from cart.

**Computed**

- `thumbnail` - returns src of products thumbnail

**Methods**

- `removeFromCart` - removes current product (data property `product`) from cart
- `updateQuantity` - updates cart quantity for current product (data property `product`)

## Store

Cart Store is designed to handle all actions related the shopping cart.

### State

```js
  state: {
    itemsAfterPlatformTotals: {},
    platformTotals: null,
    platformTotalSegments: null,
    cartIsLoaded: false,
    cartServerToken: '', // server side ID to synchronize with Backend (for example Magento)
    shipping: [],
    payment: [],
    cartItemsHash: '',
    bypassCount: 0,
    cartItems: [] // TODO: check if it's properly namespaced
  },
```

Cart state is automatically loaded from `localForage` collection after page has been loaded whenever `core/components/blocks/Microcart.vue` is included. The cart state is loaded by dispatching `cart/load` action and [stored automatically by any change to the cart state](https://github.com/vuestorefront/vue-storefront/blob/c43b2966a9ae10661e5a62b10445403ed9789b32/core/store/index.js#L118).

The cart state data:

- `itemsAfterPlatformTotals` - helper collection, dictionary where the key is Magento cart item `item_id` that stores the totals information per item - received from Magento; it's automatically populated when `config.cart.synchronize_totals` is enabled;
- `platformTotals` - similarly to above item, here we have the full totals from Magento for the current shopping cart. These collections are populated by [`cart/serverTotals`](https://github.com/vuestorefront/vue-storefront/blob/c43b2966a9ae10661e5a62b10445403ed9789b32/core/store/modules/cart/actions.js#L49) and the event handler for [`servercart-after-totals`](https://github.com/vuestorefront/vue-storefront/blob/c43b2966a9ae10661e5a62b10445403ed9789b32/core/store/modules/cart/index.js#L30)
- `cartIsLoaded` (bool) - true after dispatching `cart/load`
- `shipping` - (object) currently selected shipping method - only when NOT using `cart.synchronize_totals` (if so, the shipping and payment's data comes from Magento2),
- `payment` - (object) currently selected shipping method - only when NOT using `cart.synchronize_totals` (if so, the shipping and payment's data comes from Magento2),
- `cartItems` - collection of the cart items; the item format is the same as described in [ElasticSearch Data formats](https://github.com/vuestorefront/vue-storefront/blob/master/doc/ElasticSearch%20data%20formats.md) - the `product` class; the only difference is that the (int) `qty` field is added

### Events

The following events are published from `cart` store:

- `EventBus.$emit('cart-after-itemchanged', { item: cartItem })` - executed after [`servercart-after-itemupdated`](https://github.com/vuestorefront/vue-storefront/blob/c43b2966a9ae10661e5a62b10445403ed9789b32/core/store/modules/cart/index.js#L108) - after server cart sync, that signalize the specific shopping cart item has been changed; `Microcart/Product.vue` component is subscribed to this event to refresh the shopping cart UI
- `EventBus.$emit('cart-before-add', { product: item })` - fired after product has been added to the cart,
- `EventBus.$emit('cart-before-save', { items: state.cartItems })` - fired after the product cart has been saved,
- `EventBus.$emit('cart-before-delete', { items: state.cartItems })` - the event fired before the cart item is going to be deleted with the current cart state (before item is deleted)
- `EventBus.$emit('cart-after-delete', { items: state.cartItems })` - the event fired before the cart item has been deleted with the current cart state (after item is deleted)
- `EventBus.$emit('cart-before-itemchanged', { item: record })` - item called before the specific item properties are going to be changed; for example called when [`servercart-after-itemupdated`](https://github.com/vuestorefront/vue-storefront/blob/c43b2966a9ae10661e5a62b10445403ed9789b32/core/store/modules/cart/index.js#L108) is going to change the `server_item_id` property
- `EventBus.$emit('cart-after-itemchanged', { item: record })` - item called after the specific item properites has been changed; for example called when [`servercart-after-itemupdated`](https://github.com/vuestorefront/vue-storefront/blob/c43b2966a9ae10661e5a62b10445403ed9789b32/core/store/modules/cart/index.js#L108) is going to change the `server_item_id` property
- `EventBus.$emit('application-after-loaded')` - event called after `cart/load` action has been dispatched to notify that cart is being available,
- `EventBus.$emit('cart-after-updatetotals', { platformTotals: totals, platformTotalSegments: platformTotalSegments })` - event called after the totals from Magento has been synchronized with current state; it's going to be emitted only when `cart.synchronize_totals` option is enabled.

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

#### `connect (context, { guestCart = false })`

Action is dispatched to create the server cart and store the cart id (for further synchronization)

#### `serverUpdateItem (context, cartItem)`, `serverDeleteItem (context, cartItem)`

Actions called whenever the shopping cart item should be synchronized with server side (pushes changes to the server). Basically this method is called within [`servercart-after-pulled`](https://github.com/vuestorefront/vue-storefront/blob/c43b2966a9ae10661e5a62b10445403ed9789b32/core/store/modules/cart/index.js#L45)

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

#### `syncTotals (context, methodsData)`

This method sends request to the backend to collect cart totals. It calls different backend endpoints depending on if payment and shipping methods information is available or not.

### Getters

All state members should have been accessed only by getters. Please take a look at the state reference for data formats

```js
const getters = {
  current: state => state.current,
  list: state => state.list,
};
```
