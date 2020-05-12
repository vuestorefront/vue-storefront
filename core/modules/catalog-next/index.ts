import { categoryModule } from './store/category'
import { productModule } from './store/product'
import { StorefrontModule } from '@vue-storefront/core/lib/modules';
import config from 'config'

export const CatalogNextModule: StorefrontModule = function ({ store, router }) {
  store.registerModule('category-next', categoryModule)
  if (config.entities.product.enableProductNext) {
    store.registerModule('product', productModule)
  }
}
