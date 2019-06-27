import { StorefrontModule } from '@vue-storefront/module';
import { afterAppInitHook } from '@vue-storefront/module/hooks'
import { extendStore } from '@vue-storefront/module/helpers'
import { ExampleStore } from './store'

export const ExampleModule: StorefrontModule = function (app, store, router, config, appConfig) {
  // You can access config passed to registerModule via config variable
  console.info('From module config: ', config.message)
  store.registerModule('example', ExampleStore)
  afterAppInitHook(() => console.log('Do something when application is initialized!'))
}
