import * as types from '../../mutation-types'
import { quickSearchByQuery } from '../../lib/search'
import { entityKeyName } from '../../lib/entities'
import EventBus from '../../lib/event-bus'
const bodybuilder = require('bodybuilder')
import config from '../../lib/config'

export default {
  /**
   * Reset current category and path
   * @param {Object} context
   */
  reset (context) {
    context.commit(types.CATEGORY_UPD_CURRENT_CATEGORY_PATH, [])
    context.commit(types.CATEGORY_UPD_CURRENT_CATEGORY, {})
    EventBus.$emit('category-after-reset', { })
  },
  /**
   * Load categories within specified parent
   * @param {Object} commit promise
   * @param {Object} parent parent category
   */
  list (context, { parent = null, onlyActive = true, onlyNotEmpty = false, size = 4000, start = 0, sort = 'position:asc', includeFields = config.ssr.optimize ? [ 'children_data', 'id', 'children_count', 'sku', 'name', 'is_active', 'parent_id', 'level' ] : null }) {
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

    return quickSearchByQuery({ entityType: 'category', query: qrObj.build(), sort: sort, size: size, start: start, includeFields: includeFields }).then(function (resp) {
      commit(types.CATEGORY_UPD_CATEGORIES, resp)
      EventBus.$emit('category-after-list', { query: qrObj, sort: sort, size: size, start: start, list: resp })
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
  single (context, { key, value, setCurrentCategory = true, setCurrentCategoryPath = true }) {
    const state = context.state
    const commit = context.commit
    const dispatch = context.dispatch

    return new Promise((resolve, reject) => {
      let setcat = (error, mainCategory) => {
        if (error) {
          console.error(error)
          reject(error)
        }

        if (setCurrentCategory) {
          commit(types.CATEGORY_UPD_CURRENT_CATEGORY, mainCategory)
        }
        if (setCurrentCategoryPath) {
          let currentPath = []
          let recurCatFinder = (category) => {
            if (!category) {
              return
            }
            if (category.parent_id) {
              dispatch('single', { key: 'id', value: category.parent_id, setCurrentCategory: false, setCurrentCategoryPath: false }).then((sc) => { // TODO: move it to the server side for one requests OR cache in indexedDb
                if (!sc) {
                  commit(types.CATEGORY_UPD_CURRENT_CATEGORY_PATH, currentPath)
                  EventBus.$emit('category-after-single', { category: mainCategory })
                  return resolve(mainCategory)
                }
                currentPath.unshift(sc)
                if (sc.parent_id) {
                  recurCatFinder(sc)
                }
              }).catch(err => {
                console.error(err)
                commit(types.CATEGORY_UPD_CURRENT_CATEGORY_PATH, currentPath) // this is the case when category is not binded to the root tree - for example 'Erin Recommends'
                resolve(mainCategory)
              })
            } else {
              commit(types.CATEGORY_UPD_CURRENT_CATEGORY_PATH, currentPath)
              EventBus.$emit('category-after-single', { category: mainCategory })
              resolve(mainCategory)
            }
          }
          if (typeof mainCategory !== 'undefined' && mainCategory.parent_id) {
            recurCatFinder(mainCategory) // TODO: Store breadcrumbs in IndexedDb for further usage to optimize speed?
          }
        } else {
          EventBus.$emit('category-after-single', { category: mainCategory })
          resolve(mainCategory)
        }
      }

      if (state.list.length > 0) { // SSR - there were some issues with using localForage, so it's the reason to use local state instead, when possible
        let category = state.list.find((itm) => { return itm[key] === value })
        // Check if category exists in the store OR we have recursively reached Default category (id=1)
        if (category || value === 1) {
          setcat(null, category)
        } else {
          reject(Error('Category query returned empty result ' + key + ' = ' + value))
        }
      } else {
        const catCollection = global.$VS.db.categoriesCollection
        // Check if category does not exist in the store AND we haven't recursively reached Default category (id=1)
        if (!catCollection.getItem(entityKeyName(key, value), setcat) && value !== 1) {
          reject(Error('Category query returned empty result ' + key + ' = ' + value))
        }
      }
    })
  }
}
