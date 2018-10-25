import Vue from 'vue'
import EventBus from '@vue-storefront/core/plugins/event-bus'

import extensionStore from './store'
import extensionRoutes from './router'
import ComponentExample from './components/ComponentExample.vue'
// import bodybuilder from 'bodybuilder'
// import rootStore from '@vue-storefront/store'

const EXTENSION_KEY = 'custom_extension'

// bodybuilder compatibility check with graphQL: https://github.com/DivanteLtd/vue-storefront/pull/1616
/* const buildSearchQuery = (queryText) => {
  let query = bodybuilder()
    .query('range', 'visibility', { 'gte': 3, 'lte': 4 })
    .andQuery('range', 'status', { 'gte': 0, 'lt': 2 })
  query = query.andQuery('bool', b => b.orQuery('match_phrase_prefix', 'name', { query: queryText, boost: 3, slop: 2 })
    .orQuery('match_phrase', 'category.name', { query: queryText, boost: 1 })
    .orQuery('match_phrase', 'short_description', { query: queryText, boost: 1 })
    .orQuery('match_phrase', 'description', { query: queryText, boost: 1 })
    .orQuery('bool', b => b.orQuery('terms', 'sku', queryText.split('-'))
      .orQuery('terms', 'configurable_children.sku', queryText.split('-'))
      .orQuery('match_phrase', 'sku', { query: queryText, boost: 1 })
      .orQuery('match_phrase', 'configurable_children.sku', { query: queryText, boost: 1 }))
  )
  return query.build()
} */

export default function (app, router, store, config) {
  router.addRoutes(extensionRoutes) // add custom routes
  store.registerModule(EXTENSION_KEY, extensionStore) // add custom store
  // TODO: register module events here
  app.$on('application-after-init', () => {
    console.debug('Example custom-event added by template example')
    store.dispatch('product/example')
    /* rootStore.dispatch('product/list', { query: buildSearchQuery('yoga'), start: 0, size: 1, updateState: false }).then((resp) => {
      console.log('Compatibility mode works: ' + resp.items[0].name)
    }).catch((err) => {
      console.error(err)
    }) */ // commented out because it's not compliant with graphql adapter
  })

  EventBus.$on('thankyoupage-after-mounted', (parent) => {
    // This is example on how to extend exisintg page/component - if it's extendable via "Composite" mixin
    const Component = Vue.extend(ComponentExample)
    const componentInstance = (new Component())
    componentInstance.$mount('#thank-you-extensions')

    // Another way to add the component:
    // componentInstance.$mount()
    // if (typeof document !== 'undefined') {
    //  document.getElementById('checkout').appendChild(componentInstance.$el)
    // }
  })

  EventBus.$on('product-after-single', (payload) => {
    // payload.product.name = "" // this is an example on how can you modify the data
    return payload
  })

  EventBus.$on('cart-before-add', (payload) => {
    // payload.product.name = "" // this is an example on how can you modify the data
    // payload.product.sku = ""
    return payload
  })

  EventBus.$filter('product-after-load', (payload) => {
    return new Promise((resolve, reject) => {
      // payload.store.state.product.current.name = '' // this change will be visible in SSR
      resolve(payload)
    })
  })

  return { EXTENSION_KEY, extensionRoutes, extensionStore }
}
