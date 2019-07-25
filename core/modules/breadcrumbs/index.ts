import { breadcrumbsStore } from './store'
import { StorefrontModule } from '@vue-storefront/core/lib/modules'

export const BreadcrumbsModule: StorefrontModule = function (app, store, router, moduleConfig, appConfig) {
  store.registerModule('breadcrumbs', breadcrumbsStore)
}
