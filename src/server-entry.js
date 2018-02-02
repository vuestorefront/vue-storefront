import { createApp } from './app'

export default context => {
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp()
    router.push(context.url)
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      if (!matchedComponents.length) {
        return reject(new Error({ code: 404 }))
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
            reject(new Error({ code: 404 }))
          } else {
            reject(new Error())
          }
        })
      }))
    }, reject)
  })
}
