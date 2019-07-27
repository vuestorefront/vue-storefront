import { StorefrontModule } from '@vue-storefront/module'
import { extendStore } from '@vue-storefront/core/helpers'
import { CategoryStore } from './store'
import { ExtendedCategoryStore } from './store/category'

const KEY = 'icmaa-category'

export const IcmaaCategoryModule: StorefrontModule = function (app, store, router, moduleConfig, appConfig) {
  store.registerModule('icmaaCategory', CategoryStore)
  extendStore('category-next', ExtendedCategoryStore)
}
