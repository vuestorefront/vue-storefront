import { union } from 'lodash-es'

import { createApp } from '@vue-storefront/core/app'
import { HttpError } from '@vue-storefront/core/lib/exceptions'
import { prepareStoreView, storeCodeFromRoute } from '@vue-storefront/store/lib/multistore'
import rootStore from '@vue-storefront/store'
import sizeof from 'object-sizeof'
import omit from 'lodash-es/omit'

declare var global: any
if (!global.$VS) global.$VS = {}

function _commonErrorHandler (err, reject) {
  if (err.message.indexOf('query returned empty result') > 0) {
    reject(new HttpError(err.message, 404))
  } else {
    reject(new Error(err.message))
  }
}

function _ssrHydrateSubcomponents (components, store, router, resolve, reject, app, context) {
  Promise.all(components.map(SubComponent => {
    if (SubComponent.asyncData) {
      return SubComponent.asyncData({
        store,
        route: router.currentRoute
      })
    }
  })).then(() => {
    if (rootStore.state.config.ssr.initialStateFilter) {
      context.state = omit(store.state, rootStore.state.config)
    } else {
      context.state = store.state
    }
    resolve(app)
  }).catch(err => {
    _commonErrorHandler(err, reject)
  })
}

export default context => {
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp()

    const sizeOfCache = sizeof(global.$VS.localCache) / 1024
    console.log('Local cache size = ' + sizeOfCache + 'KB')
    const meta = (app as any).$meta()
    router.push(context.url)
    context.meta = meta
    router.onReady(() => {
      if (store.state.config.storeViews.multistore === true) {
        let storeCode = context.storeCode // this is from http header or env variable
        if (router.currentRoute) { // this is from url
          storeCode = storeCodeFromRoute(router.currentRoute)
        }
        if (storeCode !== '' && storeCode !== null) {
          prepareStoreView(storeCode)
        }
      }
      const matchedComponents = router.getMatchedComponents()
      if (!matchedComponents.length) {
        return reject(new HttpError('No components matched', 404))
      }
      Promise.all(matchedComponents.map(Component => {
        const components = Component.mixins ? Array.from(Component.mixins) : []
        union(components, [Component]).map(SubComponent => {
          if (SubComponent.preAsyncData) {
            SubComponent.preAsyncData({ store, route: router.currentRoute })
          }
        })
        if (Component.asyncData) {
          Component.asyncData({ store, route: router.currentRoute }).then((result) => { // always execute the asyncData() from the top most component first
            console.log('Top-most asyncData executed')
            _ssrHydrateSubcomponents(components, store, router, resolve, reject, app, context)
          }).catch((err) => {
            _commonErrorHandler(err, reject)
          })
        } else {
          _ssrHydrateSubcomponents(components, store, router, resolve, reject, app, context)
        }
      }))
    }, reject)
  })
}
