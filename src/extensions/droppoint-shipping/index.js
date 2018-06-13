import extensionRoutes from './router'

const EXTENSION_KEY = 'droppoint-shipping'

export default function (app, router, store, config) {
  console.log('Droppoint shipping extension registered')
  router.addRoutes(extensionRoutes) // add custom routes
  import(/* webpackChunkName: "store-droppoint-shipping" */'./store').then(extensionStore => {
    store.registerModule(EXTENSION_KEY, extensionStore) // add custom store
  })

  return {EXTENSION_KEY, extensionRoutes}
}
