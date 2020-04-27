import { breadcrumbsStore } from './store'
import { StorefrontModule } from '@vue-storefront/core/lib/modules'

export const BreadcrumbsModule: StorefrontModule = function ({ store }) {
  store.registerModule('breadcrumbs', breadcrumbsStore)
}
