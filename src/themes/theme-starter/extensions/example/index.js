const EXTENSION_KEY = 'theme_default_example'

export default function (app, router, store, config) {
  app.$on('application-after-init', () => {
    console.log('Hello from custom theme extension')
  })
  return { EXTENSION_KEY, extensionRoutes: null, extensionStore: null }
}
