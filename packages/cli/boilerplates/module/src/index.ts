import { StorefrontModule } from '@vue-storefront/module'
import { afterAppInit } from '@vue-storefront/module/hooks'
import { extendStore } from '@vue-storefront/module/helpers'
import { ExampleStore, ExtendProductStore } from './store'

export const ExampleModule: StorefrontModule = function (app, store, router, moduleConfig, appConfig) {
  // You can access config passed to registerModule via moduleConfig variable
  // This is how you register new Vuex modules
  store.registerModule('example', ExampleStore)
  // This is how you override properties of currently existing Vuex modules
  extendStore('product', ExtendProductStore)
  // This is how you can hook into various palces of the application
  afterAppInit(() => console.log('Do something when application is initialized!'))
}
