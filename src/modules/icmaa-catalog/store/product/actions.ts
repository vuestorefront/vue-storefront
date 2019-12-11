import { ActionTree } from 'vuex'
import RootState from '@vue-storefront/core/types/RootState'
import ProductState from '@vue-storefront/core/modules/catalog/types/ProductState'
import config, { icmaa } from 'config'
import cloneDeep from 'lodash-es/cloneDeep'
import intersection from 'lodash-es/intersection'

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
      let currentCategory = rootGetters['category-next/getCurrentCategory'] // use current category, if set
      if (!currentCategory || !currentCategory.id || !product.category_ids.includes(currentCategory.id.toString())) {
        const { path } = icmaa.breadcrumbs
        const categoryFilters = Object.assign(
          { 'id': [...product.category_ids], path },
          cloneDeep(config.entities.category.breadcrumbFilterFields)
        )

        const onlyActive = false
        const categories = await dispatch(
          'category-next/loadCategories',
          { filters: categoryFilters, onlyActive },
          { root: true }
        )

        currentCategory = categories.sort((a, b) => (a.level > b.level) ? -1 : 1)[0] // sort starting by deepest level
      }
      await dispatch('category-next/loadCategoryBreadcrumbs', { category: currentCategory, currentRouteName: product.name }, { root: true })
    }
  }
}

export default actions
