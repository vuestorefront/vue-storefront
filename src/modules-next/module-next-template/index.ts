import { StorefrontModule } from '@vue-storefront/module';
import { onAppInit } from '@vue-storefront/module/hooks'
import { ExampleStore } from "./store"

export const ExampleModule: StorefrontModule = function (app, store, router, config, appConfig) {
  // You can access config passed to registerModule via config variable
  console.info('From module config: ', config.message)
  store.registerModule('example', ExampleStore)
  onAppInit(() => console.log('Do something when application is initialized!'))
}