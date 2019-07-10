import { categoryNextStore } from './store/category'
import { StorefrontModule } from '@vue-storefront/module';

export const KEY = 'catalog-next'
export const CatalogNextModule: StorefrontModule = function (app, store, router, moduleConfig, appConfig) {
  store.registerModule(KEY, categoryNextStore)
}
