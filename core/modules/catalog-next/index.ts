import { categoryModule } from './store/category'
// import { productModule } from './store/product'
import { StorefrontModule } from '@vue-storefront/core/lib/modules';

export const CatalogNextModule: StorefrontModule = function ({ store, router }) {
  store.registerModule('category-next', categoryModule)
  // store.registerModule('product', productModule)
}
