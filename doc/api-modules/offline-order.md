# Wishlist module

The offline order module as name suggests is a set of mixins responsible for support for offline orders. You can find methods responsible for confirming/canceling orders placed offline.

## Content

#### confirmOrders
- [method] confirmOrders()

#### cancelOrders
- [method] cancelOrders()

## Helpers

#### onNetworkStatusChange
- [function] onNetworkStatusChange(store)

## Extends

- `service-worker.js` - for offline notifications

## Example

````javascript
// Inside Vue component
import {
  confirmOrders,
  cancelOrders
} from '@vue-storefront/core/api/offline-order'

export default {
  //...other properties
  mixins: [
    confirmOrders,
    cancelOrders
  ]
}
````
