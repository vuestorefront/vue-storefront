import { createApp } from './app'
import EventBus from 'src/event-bus'

export default context => {
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp()
    EventBus.$on('product.not-exist', () => {
      router.push({ name: 'page-not-found' })
    })
    router.push(context.url)
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      if (!matchedComponents.length) {
        return reject({ code: 404 })
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
        }).catch(reject)
      }))
    }, reject)
  })
}
