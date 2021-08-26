import { categoryModule } from './store/category'
import { StorefrontModule } from '@vue-storefront/core/lib/modules';

export const CatalogNextModule: StorefrontModule = function ({ store }) {
  store.registerModule('category-next', categoryModule)
}
