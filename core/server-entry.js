import { createApp } from './app'
import { HttpError } from 'core/lib/exceptions'
global.$VS.isSSR = true

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
        components.push(Component)
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
          if (err.message.indexOf('query returned empty result') > 0) {
            reject(new HttpError(err.message, 404))
          } else {
            reject(new Error(err.message))
          }
        })
      }))
    }, reject)
  })
}
