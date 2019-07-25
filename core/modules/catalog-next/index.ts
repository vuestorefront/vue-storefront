import { categoryModule } from './store/category'
import { StorefrontModule } from '@vue-storefront/core/lib/modules';

export const CatalogNextModule: StorefrontModule = function (app, store, router, moduleConfig, appConfig) {
  store.registerModule('category-next', categoryModule)
}
