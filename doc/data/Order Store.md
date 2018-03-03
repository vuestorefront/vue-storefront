# Order Vuex Store

Order store is very simple, used just to pass the current order to the backend service.

## Actions 

The order store provides following public actions:

### `placeOrder ({ commit }, order)`
The order object is queued in the local, indexedDb `ordersCollection` to be send to the server.
Please take a look at the [Working with data](https://github.com/DivanteLtd/vue-storefront/blob/master/doc/Working%20with%20data.md) for detals about the data formats and how does `localForage` is being used in this project.