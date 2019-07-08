import { afterAppInit } from '@vue-storefront/module/hooks'
import { extendStore } from '@vue-storefront/module/helpers'
import { StorefrontModule } from "@vue-storefront/module"
import { ExampleStore } from './store'

export const ExampleModule: StorefrontModule = function (app, store, router, config, appConfig) {
  // You can access config passed to registerModule via config variable
  console.info('From module config: ', config.message)
  // This is how you register new Vuex modules
  store.registerModule('example', ExampleStore)
  // This is how you can hook into various palces of the application
  afterAppInit(() => console.log('Do something when application is initialized!'))
}
