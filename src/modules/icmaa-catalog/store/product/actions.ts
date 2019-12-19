import { ActionTree } from 'vuex'
import RootState from '@vue-storefront/core/types/RootState'
import ProductState from '@vue-storefront/core/modules/catalog/types/ProductState'
import config, { icmaa } from 'config'
import cloneDeep from 'lodash-es/cloneDeep'

const actions: ActionTree<ProductState, RootState> = {
  /**
   * Clone of originial `product/loadProductBreadcrumbs`
   *
   * Changes:
   * * Load only parent categories containing `icmaa.breadcrumbs.path` items in path
   * * This way we can prior categories of products to be used as parent category
   */
  async loadProductBreadcrumbs ({ dispatch, rootGetters }, { product } = {}) {
    if (product && product.category_ids) {
      const currentCategory = rootGetters['category-next/getCurrentCategory']

      let breadcrumbCategory
      const onlyActive = false
      const { path } = icmaa.breadcrumbs
      const categoryFilters = Object.assign(
        { 'id': [...product.category_ids], path },
        cloneDeep(config.entities.category.breadcrumbFilterFields)
      )

      const categories = await dispatch(
        'category-next/loadCategories',
        { filters: categoryFilters, onlyActive, reloadAll: true },
        { root: true }
      )

      if (currentCategory && currentCategory.id && (categories.findIndex(category => category.id === currentCategory.id) >= 0)) {
        breadcrumbCategory = currentCategory // use current category if set and included in the filtered list
      } else {
        breadcrumbCategory = categories.sort((a, b) => (a.level > b.level) ? -1 : 1)[0] // sort starting by deepest level
      }

      await dispatch('category-next/loadCategoryBreadcrumbs', { category: breadcrumbCategory, currentRouteName: product.name }, { root: true })
    }
  }
}

export default actions
