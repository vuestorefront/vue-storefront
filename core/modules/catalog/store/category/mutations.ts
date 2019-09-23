import Vue from 'vue'
import { MutationTree } from 'vuex'
import * as types from './mutation-types'
import { formatBreadCrumbRoutes } from '@vue-storefront/core/helpers'
import { entityKeyName } from '@vue-storefront/core/lib/store/entities'
import CategoryState from '../../types/CategoryState'
import { Logger } from '@vue-storefront/core/lib/logger'
import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'
import { StorageManager } from '@vue-storefront/core/lib/storage-manager'
import slugifyCategories from '@vue-storefront/core/modules/catalog/helpers/slugifyCategories'

const mutations: MutationTree<CategoryState> = {
  [types.CATEGORY_UPD_CURRENT_CATEGORY] (state, category) {
    state.current = category
    EventBus.$emit('category-after-current', { category: category })
  },
  [types.CATEGORY_UPD_CURRENT_CATEGORY_PATH] (state, path) {
    state.current_path = path // TODO: store to cache
    state.breadcrumbs.routes = formatBreadCrumbRoutes(state.current_path)
  },
  [types.CATEGORY_UPD_CATEGORIES] (state, categories) {
    const catCollection = StorageManager.get('categories')

    for (let category of categories.items) {
      category = slugifyCategories(category)
      const catExist = state.list.find(existingCat => existingCat.id === category.id)

      if (!catExist) {
        state.list.push(category)
      }

      if (!categories.includeFields) {
        try {
          catCollection
            .setItem(entityKeyName('slug', category.slug.toLowerCase()), category)
            .catch(reason => Logger.error(reason, 'category'))

          catCollection
            .setItem(entityKeyName('id', category.id), category)
            .catch(reason => Logger.error(reason, 'category'))
        } catch (e) {
          Logger.error(e, 'category')()
        }
      }
    }

    state.list.sort((catA, catB) => {
      if (catA.position && catB.position) {
        if (catA.position < catB.position) return -1
        if (catA.position > catB.position) return 1
      }
      return 0
    })
  },
  [types.CATEGORY_ADD_AVAILABLE_FILTER] (state, { key, options = [] }) {
    Vue.set(state.filters.available, key, options)
  },
  [types.CATEGORY_REMOVE_FILTERS] (state) {
    state.filters.chosen = {}
    state.current_product_query.configuration = {}
  },
  [types.CATEGORY_UPD_SEARCH_PRODUCT_QUERY] (state, newQuery) {
    state.current_product_query = newQuery
  },
  [types.CATEGORY_SET_SEARCH_OPTIONS] (state, searchOptions) {
    state.current_product_query = searchOptions || null
  },
  [types.CATEGORY_MERGE_SEARCH_OPTIONS] (state, searchOptions = {}) {
    let currentOptions = state.current_product_query || {}
    state.current_product_query = Object.assign(currentOptions, searchOptions)
  }
}

export default mutations
