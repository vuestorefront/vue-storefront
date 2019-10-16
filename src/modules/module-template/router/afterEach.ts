// This function will be executed after entering each route.
// See https://router.vuejs.org/guide/advanced/navigation-guards.html#global-after-hooks
import { Route } from 'vue-router'
import { Logger } from '@vue-storefront/core/lib/logger'

export function afterEach (to: Route, from: Route) {
  Logger.info(`We have just entered ${to.name} from ${from.name}.`)()
}
