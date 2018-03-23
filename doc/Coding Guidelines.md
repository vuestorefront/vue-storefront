# Vue Storefront Coding Guidelines - DRAFT

Hello Extension / Theme / Core developer! This is just a short guide to align the code style among the core modules and all the extensions and thems.

## General guidelines
In general we're using kind of mix of: [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript) and [JavaScript Standard Style](https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style). There are a eslint and vue-eslint configured to enforce the style. Please do use the same [configs in Your modules](https://github.com/DivanteLtd/vue-storefront/blob/master/.eslintrc.js). 

## ES2015
We do preffer to use ES2015 constructions in the code - and there is a babel compiler set to allow us to do so. So use the ES modules instead of `require` and feel free to use other fancy structures.

## Components
Components should be created as [Single File Vue components](https://vuejs.org/v2/guide/single-file-components.html) and names using `CamelCase.vue`.
All the component properties should be named using `camelCase` as well.
All the component data fields should be `camelCased`.

Theme catalog structure is well described in here: [Working with themes](https://github.com/DivanteLtd/vue-storefront/blob/master/doc/themes/Working%20with%20themes.md)

## Extensions
For the reference of how extension can be structured please take a look at [template](https://github.com/DivanteLtd/vue-storefront/tree/develop/src/extensions/template).
Check the [Working with extensions](https://github.com/DivanteLtd/vue-storefront/blob/develop/doc/extensions/Working%20with%20extensions.md) for more info.

It's something like this:

```
|____store.js
|____index.js
|____components
| |____ComponentExample.vue
|____router.js
|____package.json
|____pages
| |____PageExample.vue
```

## Events
We're using [Vue events](https://vuejs.org/v2/guide/events.html) for async. operations handling and exposing some extension points in the code.

The naming convention for the new events to be introduced is:
`module-[before|after]-operation` - for example the event fired after order has been placed is named: `order-after-placed` and the event fired after product is loaded: `product-after-load`. 

## Vuex
We're using Vuex for all kind of state/date related operations. Vuex stores are modularized and Your extensions can have additional Vuex modules as well by just extending it's own [`store.js`](https://github.com/DivanteLtd/vue-storefront/tree/master/src/extensions/custom_extension).
If You're adding some data operations to Core - check if t shouldn't be another module for that, then create the store separating the `actions`, `mutations` and `getters` to separate files:

```
.
|____order
| |____mutations.js
| |____actions.js
| |____index.js
|____attribute
| |____mutations.js
| |____actions.js
| |____getters.js
| |____index.js
| |____helpers.js
|____homepage
| |____index.js
...
```
Check the [Working with Vuex](https://github.com/DivanteLtd/vue-storefront/blob/develop/doc/data/Working%20with%20Vuex.md) for more info.

Please use Vuex for all state/data management and avoid loading local properties/local data inside Your components. This will casue problems with reactivity and SSR.

## Data fetching
All remote operations should've been placed inside the Vuex actions, using `fetch()` or exisiting [`data/sync`](https://github.com/DivanteLtd/vue-storefront/blob/develop/doc/data/Sync%20Store.md) module.

## Offline support
Vue Storefront should be able to work offline. All key data must be stored using `localForage`. The network requests that are modifying the client's or other data records should be [queued using the `data/sync` module](https://github.com/DivanteLtd/vue-storefront/blob/develop/doc/data/Sync%20Store.md) Please see more on this in [Working with data](https://github.com/DivanteLtd/vue-storefront/blob/0128bad05b6eeb19d7bd5b8cebcc56df28892c84/doc/Working%20with%20data.md).

## SSR Support
Product, Category, Home and some more pages are supporting Server Side Rendering using default [Vue SSR features](https://vuejs.org/v2/guide/ssr.html).
All data required for the server side rendering must be fetched inside `asyncData(route, store)` component method - which is static (and therefore doesn't have access to `this`). Please do operate ONLY on the Vuex stores.

`asyncData` returns a Promise - here is an example from Home Page (for more sophisticated cases take a look at [Product page](https://github.com/DivanteLtd/vue-storefront/blob/0128bad05b6eeb19d7bd5b8cebcc56df28892c84/core/pages/Product.vue#L144)):

```
  asyncData ({ store, route }) { // this is for SSR purposes to prefetch data
    return new Promise((resolve, reject) => {
      console.log('Entering asyncData for Home root ' + new Date())
      EventBus.$emitFilter('home-after-load', { store: store, route: route }).then((results) => {
        return resolve()
      }).catch((err) => {
        console.error(err)
        return resolve()
      })
    })
  },
```

## Core vs Theme components
We're trying to not have any specific UI / markup inside [`core/components`](https://github.com/DivanteLtd/vue-storefront/tree/0128bad05b6eeb19d7bd5b8cebcc56df28892c84/core/components) and [`core/pages`](https://github.com/DivanteLtd/vue-storefront/tree/0128bad05b6eeb19d7bd5b8cebcc56df28892c84/core/pages).
You should have Your UI inside the theme. Please check the:
- core [Product page](https://github.com/DivanteLtd/vue-storefront/blob/0128bad05b6eeb19d7bd5b8cebcc56df28892c84/core/pages/Product.vue)
vs.
- default theme [Product page](https://github.com/DivanteLtd/vue-storefront/blob/0128bad05b6eeb19d7bd5b8cebcc56df28892c84/src/themes/default/pages/Product.vue).

The key line is the `mixins` inclusion: https://github.com/DivanteLtd/vue-storefront/blob/0128bad05b6eeb19d7bd5b8cebcc56df28892c84/src/themes/default/pages/Product.vue#L215

The same applies to custom themes and extensions

## Payment gateways extensions
With the #822 - any payment extension should be compliant with this "new stanard". Please take [vue-storefront-stripe](https://github.com/develodesign/vue-storefront-stripe) as an example.
Please also take a look at: https://github.com/DivanteLtd/vue-storefront/blob/master/doc/components/Extending%20UI%20from%20extensions.md



