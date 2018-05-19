import { createApp } from './app'
import union from 'lodash-es/union'
import { HttpError } from 'core/lib/exceptions'
global.$VS.isSSR = true

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
    context.state = store.state
    resolve(app)
  }).catch(err => {
    _commonErrorHandler(err, reject)
  })
}

export default context => {
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp()
    const meta = app.$meta()
    router.push(context.url)
    context.meta = meta
    router.onReady(() => {
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
