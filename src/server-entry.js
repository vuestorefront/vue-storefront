import { createApp } from './app'

export default context => {
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp()
    router.push(context.url)
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      if (!matchedComponents.length) {
        return reject({ code: 404 })
      }
      Promise.all(matchedComponents.map(Component => {
        if (Component.mixins) {
          const components = Array.from(Component.mixins)
          components.push(Component)
          Promise.all(components.map(SubComponent => {
            if (SubComponent.asyncData) {
              return SubComponent.asyncData({
                store,
                route: router.currentRoute
              })
            }
          })).then(() => {
            context.state = store.state // TODO: for some pages like category it's massive; need to be optimized
            resolve(app)
          }).catch(reject)
        }
      }))
    }, reject)
  })
}
