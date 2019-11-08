import { ActionTree } from 'vuex'
import RootState from '@vue-storefront/core/types/RootState'
import { Category } from '@vue-storefront/core/modules/catalog-next/types/Category'
import CategoryState, { CategoryStateListItemHydrated, ProductListingWidgetState } from '../types/CategoryState'
import * as types from './mutation-types'
import * as catTypes from '@vue-storefront/core/modules/catalog-next/store/category/mutation-types'
import { fetchCategoryById, fetchChildCategories } from '../helpers'
import SearchQuery from '@vue-storefront/core/lib/search/searchQuery'

import { Logger } from '@vue-storefront/core/lib/logger'

const actions: ActionTree<CategoryState, RootState> = {
  async list ({ state, commit }, { parentId, crawlDepth = 1 }): Promise<CategoryStateListItemHydrated> {
    if (!state.lists.find(item => item.parent === parentId)) {
      let parent = await fetchCategoryById({ parentId })
        .then(resp => {
          return resp.items[0]
        })
        .catch(error => {
          Logger.error('Can\'t find category: ' + parentId, 'icmaaCategoryList', error)()
          return false
        })

      if (!parent) {
        return
      }

      let list: Category[] | void = await fetchChildCategories({ parentId, level: parent.level + crawlDepth })
        .then(resp => resp)
        .catch(error => {
          Logger.error('Error while fetching children of category: ' + parentId, 'icmaaCategoryList', error)()
        })

      commit(`category-next/${catTypes.CATEGORY_ADD_CATEGORIES}`, [ parent, ...list ], { root: true })
      commit(types.ICMAA_CATEGORY_LIST_ADD_CATEGORY_LIST, { parent, list })

      return { parent, list: list as Category[] }
    }
  },
  async loadProductListingWidgetProducts ({ state, commit, dispatch }, params: { categoryId: number, cluster: string, size: number, sort: string }): Promise<ProductListingWidgetState> {
    const { categoryId, cluster, size, sort } = params

    if (state.productListingWidget.find(i => i.parent === categoryId && i.list.length >= size)) {
      return
    }

    let query = new SearchQuery()
    query
      .applyFilter({ key: 'visibility', value: { in: [2, 3, 4] } })
      .applyFilter({ key: 'status', value: { in: [0, 1] } })
      .applyFilter({ key: 'category_ids', value: { in: [categoryId] } })

    if (cluster) {
      query.applyFilter({ key: 'customercluster', value: { in: [parseInt(cluster)] } })
    }

    return dispatch('product/findProducts', { query, size, sort }, { root: true }).then(products => {
      const payload = { parent: categoryId, list: products.items }
      commit(types.ICMAA_CATEGORY_LIST_ADD_PRODUCT, payload)
      return payload
    })
  }
}

export default actions
