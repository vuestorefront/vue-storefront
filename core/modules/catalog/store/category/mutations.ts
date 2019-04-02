import Vue from 'vue'
import { MutationTree } from 'vuex'
import * as types from './mutation-types'
import { slugify, formatBreadCrumbRoutes } from '@vue-storefront/core/helpers'
import { entityKeyName } from '@vue-storefront/core/store/lib/entities'
import CategoryState from '../../types/CategoryState'
import rootStore from '@vue-storefront/core/store'
import { Logger } from '@vue-storefront/core/lib/logger'

const mutations: MutationTree<CategoryState> = {
  [types.CATEGORY_UPD_CURRENT_CATEGORY] (state, category) {
    state.current = category
    Vue.prototype.$bus.$emit('category-after-current', { category: category })
  },
  [types.CATEGORY_UPD_CURRENT_CATEGORY_PATH] (state, path) {
    state.current_path = path // TODO: store to cache
    state.breadcrumbs.routes = formatBreadCrumbRoutes(state.current_path)
  },
  [types.CATEGORY_UPD_CATEGORIES] (state, categories) {
    for (let category of categories.items) {
      let catSlugSetter = (category) => {
        if (category.children_data) {
          for (let subcat of category.children_data) { // TODO: fixme and move slug setting to vue-storefront-api
            if (subcat.name) {
              subcat = Object.assign(subcat, { slug: subcat.slug ? subcat.slug : ((subcat.hasOwnProperty('url_key') && rootStore.state.config.products.useMagentoUrlKeys) ? subcat.url_key : (subcat.hasOwnProperty('name') ? slugify(subcat.name) + '-' + subcat.id : '')) })
              catSlugSetter(subcat)
            }
          }
        }
      }
      catSlugSetter(category)
      if (categories.includeFields == null) {
        const catCollection = Vue.prototype.$db.categoriesCollection
        try {
          catCollection.setItem(entityKeyName('slug', category.slug.toLowerCase()), category).catch((reason) => {
            Logger.error(reason, 'category') // it doesn't work on SSR
          }) // populate cache by slug
          catCollection.setItem(entityKeyName('id', category.id), category).catch((reason) => {
            Logger.error(reason, 'category') // it doesn't work on SSR
          }) // populate cache by id
        } catch (e) {
          Logger.error(e, 'category')()
        }
      }
    }
    if (state.list) {
      categories.items.map(newCat => {
        if (!state.list.find(existingCat => existingCat.id == newCat.id)) {
          state.list.push(newCat)
        }
      })
    } else {
      state.list = categories.items
    }
  },
  [types.CATEGORY_ADD_AVAILABLE_FILTER] (state, {key, options = []}) {
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
