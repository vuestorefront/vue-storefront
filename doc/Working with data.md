# Introduction 

Vue storefront uses two primary data sources:
1. IndexedDb/WebSQL data store in the browser - using localForage (https://github.com/localForage/localForage)
2. Server data source via vue-storefront-api (https://github.com/DivanteLtd/vue-storefront-api) - which API is compliant with ElasticSearch (regarding product catalog)

## Local data store

You can access localForage repositories thru `Vue.$db` or `global.db` objects anywhere in the code BUT all data-related operations SHOULD be placed in Vuex stores.

We basicaly have following data stores accesible in the browser (`/src/store/index.js`):

```js
Vue.prototype.$db = {
  ordersCollection: localForage.createInstance({
    name: 'shop',
    storeName: 'orders'
  }),

  categoriesCollection: localForage.createInstance({
    name: 'shop',
    storeName: 'categories'
  }),

  cartsCollection: localForage.createInstance({
    name: 'shop',
    storeName: 'carts'
  })
}

global.db = Vue.prototype.$db // localForage instance
```

`Orders` repository stores all orders transmitted and *to be transmitted* (aka. order queue) used by service worker.
`Categories` is a hash organized by category 'slug' (for example for category with name = 'Example category', slug = 'example-category')
`Carts` is a store for shopping cart with default key = 'current-cart' representing current shopping cart

## Cart data format

```
## Category data format

## Order data format

# Data validation
