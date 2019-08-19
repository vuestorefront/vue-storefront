// This function will be executed before entering each route.
// It's important to have 'next()'. It enables navigation to new route.
// See https://router.vuejs.org/guide/advanced/navigation-guards.html#global-guards
import { Route } from 'vue-router'
import { Logger } from '@vue-storefront/core/lib/logger'

export function beforeEach (to: Route, from: Route, next) {
  Logger.info('We are going to visit' + to.name)()
  next()
}
