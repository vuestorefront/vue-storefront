import { breadcrumbsStore } from './store'
import { StorefrontModule } from '@vue-storefront/module'

export const BreadcrumbsModule: StorefrontModule = function (app, store, router, moduleConfig, appConfig) {
  store.registerModule('breadcrumbs', breadcrumbsStore)
}
