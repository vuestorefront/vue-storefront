# Async Data Loader

Starting with Vue Storefront 1.8, there is a new, experimental API for extending server-side data fetching. The library is called `AsyncDataLoader` and consists of two methods: `push` , which is used to enqueue new data-fetching promises and `flush`, which is used to execute all the enqueued promises.

The server-side rendering feature of Vue Storefront has been designed according to general [Vue.js SSR principles](https://vuejs.org/v2/guide/ssr.html). Each root-level page (which is assigned to a route) consists of a special `asyncData` method which is executed before any component is created, just to fill the Vuex state with all the necessary data.

The pre-fetched Vuex state is then provided within thew `window.__INITIAL_STATE__` object to the client to hydrate the client side data. 

Because `asyncData` methods are centralized (one per route), it was not possible to inject any data pre-fetching method from within any module / custom code either theme added to Vue Storefront. If you've created your own version of `Product.vue` or `Category.vue` page in the theme, you could have changed `asyncData` but that's all.

So there we have the AsyncLoader 😃

## Examples

Take a look at the `src/module-template/hooks/beforeRegistration` for an example:

```js
import { AsyncDataLoader } from '@vue-storefront/core/lib/async-data-loader'
  AsyncDataLoader.push({ // this is an example showing how to call data loader from another module
    execute: ({ route, store, context }) => {
      return new Promise ((resolve, reject) => {
        store.dispatch('example/dataloader').then((results) => {
          resolve(results)
        })
      })
    }
  })
```

That's all! The action enqueued in here will be executed with every SSR request and the `store.state.exampleDataFetchedByLoader` will be attached to the `window.__INITIAL_STATE__.exampleDataFetchedByLoader`so your data will be accessible in the SSR mode.

You can selectively execute the fetching logic by checking the `route` or `context` objects provided:

```js
import { AsyncDataLoader } from '@vue-storefront/core/lib/async-data-loader'
  AsyncDataLoader.push({ // this is an example showing how to call data loader from another module
    execute: ({ route, store, context }) => {
      return new Promise ((resolve, reject) => {
        if (route.name === 'bundle-product') {
          store.dispatch('example/dataloader').then((results) => {
            resolve(results)
          })
        } else {
          resolve(null)
        }
      })
    }
  })
```

The `context` object is a `Vue.prototype.$ssrContext` and it equals to `context` object passed to `asyncData` methods:

```js
    const context = {
      url: req.url,
      output: {
        prepend: (context) => { return '' }, // these functions can be replaced in the Vue components to append or prepend some content AFTER all other things are rendered. So in this function You may call: output.prepend() { return context.renderStyles() } to attach styles
        append: (context) => { return '' },
        appendHead: (context) => { return '' },
        template: 'default',
        cacheTags: null
      },
      server: {
        app: app,
        response: res,
        request: req
      },
      meta: null,
      vs: {
        config: config,
        storeCode: req.header('x-vs-store-code') ? req.header('x-vs-store-code') : process.env.STORE_CODE
      }
    }
  ```

  As You might see by the context object Your modules have the access to `Express.js` app (thru `context.server`)!
