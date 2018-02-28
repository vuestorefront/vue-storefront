# Cart Vuex Store

Cart Store is designed to handle all actions related the shopping cart.

## State

```js
  state: {
    itemsAfterPlatformTotals: {},
    platformTotals: null,
    platformTotalSegments: null,
    cartIsLoaded: false,
    cartServerPullAt: 0,
    cartServerTotalsAt: 0,
    cartServerCreatedAt: 0,
    cartSavedAt: new Date(),
    bypassToAnon: false,
    cartServerToken: '', // server side ID to synchronize with Backend (for example Magento)
    shipping: { cost: 0, code: '' },
    payment: { cost: 0, code: '' },
    cartItems: [] // TODO: check if it's properly namespaced
  },
```

Cart state is automatically loaded from `localForage` collection after page has been loaded whenever `core/components/blocks/Microcart.vue` is included. The cart state is loaded by dispatching `cart/load` action and [stored automatically by any change to the cart state](https://github.com/DivanteLtd/vue-storefront/blob/c43b2966a9ae10661e5a62b10445403ed9789b32/core/store/index.js#L118).

The cart state data:

- `itemsAfterPlatformTotals` - helper collection, dictionary where the key is Magento's cart item `item_id` that stores the totals information per item - received from Magento; it's automatically populated when `config.cart.synchronize_totals` is enabled
- `platformTotals` - similiary to above item, here we have the full totals from Magento for the current shopping cart. These collections are populated by [`cart/serverTotals`](https://github.com/DivanteLtd/vue-storefront/blob/c43b2966a9ae10661e5a62b10445403ed9789b32/core/store/modules/cart/actions.js#L49) and the event handler for [`servercart-after-totals`](https://github.com/DivanteLtd/vue-storefront/blob/c43b2966a9ae10661e5a62b10445403ed9789b32/core/store/modules/cart/index.js#L30)
- `cartIsLoaded` (bool) - true after dispatching `cart/load`
- `cartServerPullAt` (int) - timestap for the last server cart synchronization set by [`servercart-after-pulled`](https://github.com/DivanteLtd/vue-storefront/blob/c43b2966a9ae10661e5a62b10445403ed9789b32/core/store/modules/cart/index.js#L45) - enabled when `cart/synchronize` is set to true in the config,
- `cartServerTotalsAt` - (int) timestamp for the latest server totals synchronziation set by ['servercart-after-totals`](https://github.com/DivanteLtd/vue-storefront/blob/c43b2966a9ae10661e5a62b10445403ed9789b32/core/store/modules/cart/index.js#L30)
- `cartServerCreatedAt` - (int) timestamp for the last server cart id sync set by [`servercart-after-created`](https://github.com/DivanteLtd/vue-storefront/blob/c43b2966a9ae10661e5a62b10445403ed9789b32/core/store/modules/cart/index.js#L8)
- `cartSavedAt` - (int) timestamp for the latest cart - localForage (local browser) state sync,
- `bypassToAnon` - (bool) whenever there is a client's quote lock on the cart (for example the cart is currently in sync with Magento etc.) we're using the guest cart for current order; in that case this value is set to true,
- `shipping` - (objeyct) currently selected shipping method - only when NOT using `cart.synchronize_totals` (if so, the shipping and payment's data comes from Magento2),
- `payment` - (objeyct) currently selected shipping method - only when NOT using `cart.synchronize_totals` (if so, the shipping and payment's data comes from Magento2),
- `cartItems` - collection of the cart items; the item format is the same as described in [ElasticSearch Data formats](https://github.com/DivanteLtd/vue-storefront/blob/master/doc/ElasticSearch%20data%20formats.md) - the `product` class; the only difference is that the (int)`qty` field is added

## Events

The following events are published from `cart` store:

- `EventBus.$emit('cart-after-itemchanged', { item: cartItem })` - executed after [`servercart-after-itemupdated`](https://github.com/DivanteLtd/vue-storefront/blob/c43b2966a9ae10661e5a62b10445403ed9789b32/core/store/modules/cart/index.js#L108) - after server cart sync, that sygnalize the specific shopping cart item has been changed; `Microcart/Product.vue` component is subscribed to this event to refresh the shopping cart UI
- `EventBus.$emit('cart-before-add', { product: item })` - fired after product has been added to the cart,
- `EventBus.$emit('cart-before-save', { items: state.cartItems })` - fired after the product cart has been saved,
- `EventBus.$emit('cart-before-delete', { items: state.cartItems })` - the event fired before the cart item is going to be deleted with the current cart state (before item is deleted)
- `EventBus.$emit('cart-after-delete', { items: state.cartItems })` - the event fired before the cart item has been deleted with the current cart state (after item is deleted)
- `EventBus.$emit('cart-before-itemchanged', { item: record })` - item called before the specific item properites are going to be changed; for example called when [`servercart-after-itemupdated`](https://github.com/DivanteLtd/vue-storefront/blob/c43b2966a9ae10661e5a62b10445403ed9789b32/core/store/modules/cart/index.js#L108)  is going to change the `server_item_id` property
- `EventBus.$emit('cart-after-itemchanged', { item: record })` - item called after the specific item properites has been changed; for example called when [`servercart-after-itemupdated`](https://github.com/DivanteLtd/vue-storefront/blob/c43b2966a9ae10661e5a62b10445403ed9789b32/core/store/modules/cart/index.js#L108)  is going to change the `server_item_id` property
- `EventBus.$emit('application-after-loaded')` - event called after `cart/load` action has been dispatched to notify that cart is being available,
- `EventBus.$emit('cart-after-updatetotals', { platformTotals: totals, platformTotalSegments: platformTotalSegments })` - event called after the totals from Magento has been synchronized with current state; it's going to be emited only when `cart.synchronize_totals` option is enabled.


## Actions 

The cart store provides following public actions:

### `serverTokenClear (context)`
Helper method used to clear the current server cart id (used for cart synchronization)

### `clear (context)`
This method is called after order has been placed to empty the `cartItems` collection and create the new server cart when the `cart.synchronize_totals` is set to true

### `save (context)`
Method used to save the cart to the `localForage` browser collection

### `serverPull (context, { forceClientState = false })` 
This method is used to synchronize the current state of the cart items back and forth between server and current client state. When the `forceClientState` is set to false the communication is one-way only (client->server). This aciton is called automatically on any shopping cart change when the `cart.synchronize` is set to true.

### `serverTotals (context, { forceClientState = false })`
Method is called whenever the cart totals should have been synchronized with the server (after `serverPull`). This method overrides local shopping cart grand totals and specific item values (for example prices after discount).

### `serverCreate (context, { guestCart = false })`
Action is dispatched to create the server cart and store the cart id (for further synchronization)

### `serverUpdateItem (context, cartItem)`, `serverDeleteItem (context, cartItem)` 
Actions called whenever the shopping cart item should be synchronized with server side (pushes changes to the server). Basically this method is called within [`servercart-after-pulled`](https://github.com/DivanteLtd/vue-storefront/blob/c43b2966a9ae10661e5a62b10445403ed9789b32/core/store/modules/cart/index.js#L45)

### `load (context)`
This method loads the cart items from `localForage` browser state management.

### `getItem ({ commit, dispatch, state }, sku)`
This action is used for search the particular item in the shopping cart (by SKU)

### `addItem ({ commit, dispatch, state }, { productToAdd, forceServerSilence = false })`



## Getters 

All state members should have been accessed only by getters. Please take a look at the state reference for data formats

```js
const getters = {
  current: (state) => state.current,
  list: (state) => state.list
}
```