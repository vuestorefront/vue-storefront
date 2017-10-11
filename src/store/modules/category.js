import * as types from '../mutation-types'
import { entityKeyName } from '../../lib/entities'
import { slugify } from '../../lib/filters'
const bodybuilder = require('bodybuilder')
import { quickSearchByQuery } from '../../api/search'

const state = {
  list: [],
  current: null
}

const getters = {
}

// actions
const actions = {
  /**
   * Load categories within specified parent
   * @param {Object} commit promise
   * @param {Object} parent parent category
   */
  list (context, { parent = null, onlyActive = true, onlyNotEmpty = false, size = 150, start = 0 }) {
    const commit = context.commit
    let qrObj = bodybuilder()
    if (parent && typeof parent !== 'undefined') {
      qrObj = qrObj.filter('term', 'parent_id', parent.id)
    }

    if (onlyActive === true) {
      qrObj = qrObj.andFilter('term', 'is_active', true) // show only active cateogires
    }

    if (onlyNotEmpty === true) {
      qrObj = qrObj.andFilter('range', 'product_count', {'gt': 0}) // show only active cateogires
    }

    return quickSearchByQuery({ entityType: 'category', query: qrObj.build(), sort: 'position:asc' }).then(function (resp) {
      commit(types.CATEGORY_UPD_CATEGORIES, resp)
      return resp
    }).catch(function (err) {
      console.error(err)
    })
  },

  /**
   * Load category object by specific field - using local storage/indexed Db
   * loadCategories() should be called at first!
   * @param {Object} commit
   * @param {String} key
   * @param {String} value
   * @param {Bool} setCurrentCategory default=true and means that state.current_category is set to the one loaded
   */
  single (context, { key, value, setCurrentCategory = true }) {
    const state = context.state
    const commit = context.commit
    return new Promise((resolve, reject) => {
      let setcat = (error, category) => {
        if (error) reject(null)

        if (setCurrentCategory) {
          commit(types.CATEGORY_UPD_CURRENT_CATEGORY, category)
        }
        resolve(category)
      }

      if (state.list.length > 0) { // SSR - there were some issues with using localForage, so it's the reason to use local state instead, when possible
        let category = state.list.find((itm) => { return itm[key] === value })
        setcat(null, category)
      } else {
        const catCollection = global.db.categoriesCollection
        console.log(entityKeyName(key, value))
        catCollection.getItem(entityKeyName(key, value), setcat)
      }
    })
  }
}

// mutations
const mutations = {

  [types.CATEGORY_UPD_CURRENT_CATEGORY] (state, category) {
    state.current = category
  },
  [types.CATEGORY_UPD_CATEGORIES] (state, categories) {
    state.list = categories.items // extract fields from ES _source

    for (let category of state.list) {
      for (let subcat of category.children_data) { // TODO: fixme and move slug setting to vue-storefront-api
        subcat.slug = Object.assign(subcat, { slug: subcat.hasOwnProperty('name') ? slugify(subcat.name) + '-' + subcat.id : '' })
      }
      const catCollection = global.db.categoriesCollection
      try {
        catCollection.setItem(entityKeyName('slug', category.slug.toLowerCase()), category).catch((reason) => {
          console.debug(reason) // it doesn't work on SSR
        }) // populate cache by slug
        catCollection.setItem(entityKeyName('id', category.id), category).catch((reason) => {
          console.debug(reason) // it doesn't work on SSR
        }) // populate cache by id
      } catch (e) {
        console.error(e)
      }
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
