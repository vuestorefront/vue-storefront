import Vue from 'vue'
import { ActionTree } from 'vuex'
import * as types from './mutation-types'
import { quickSearchByQuery } from '@vue-storefront/core/lib/search'
import { entityKeyName } from '@vue-storefront/core/lib/store/entities'
import rootStore from '@vue-storefront/core/store'
import i18n from '@vue-storefront/i18n'
import chunk from 'lodash-es/chunk'
import trim from 'lodash-es/trim'
import toString from 'lodash-es/toString'
import { optionLabel } from '../../helpers/optionLabel'
import RootState from '@vue-storefront/core/types/RootState'
import CategoryState from '../../types/CategoryState'
import SearchQuery from '@vue-storefront/core/lib/search/searchQuery'
import { currentStoreView, localizedDispatcherRoute, localizedDispatcherRouteName } from '@vue-storefront/core/lib/multistore'
import { Logger } from '@vue-storefront/core/lib/logger'
import { isServer } from '@vue-storefront/core/helpers'
import config from 'config'
import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'
import { StorageManager } from '@vue-storefront/core/lib/storage-manager'
import createCategoryListQuery from '@vue-storefront/core/modules/catalog/helpers/createCategoryListQuery'
import { formatCategoryLink } from 'core/modules/url/helpers'

const actions: ActionTree<CategoryState, RootState> = {
  /**
   * Reset current category and path
   * @param {Object} context
   */
  reset (context) {
    context.commit(types.CATEGORY_UPD_CURRENT_CATEGORY_PATH, [])
    context.commit(types.CATEGORY_UPD_CURRENT_CATEGORY, {})
    rootStore.dispatch('stock/clearCache')
    EventBus.$emit('category-after-reset', { })
  },
  /**
   * Load categories within specified parent
   * @param {Object} commit promise
   * @param {Object} parent parent category
   */
  async list ({ commit, state, dispatch }, { parent = null, key = null, value = null, level = null, onlyActive = true, onlyNotEmpty = false, size = 4000, start = 0, sort = 'position:asc', includeFields = config.entities.optimize ? config.entities.category.includeFields : null, excludeFields = config.entities.optimize ? config.entities.category.excludeFields : null, skipCache = false, updateState = true }) {
    const { searchQuery, isCustomizedQuery } = createCategoryListQuery({ parent, level, key, value, onlyActive, onlyNotEmpty })
    const shouldLoadCategories = skipCache || ((!state.list || state.list.length === 0) || isCustomizedQuery)

    if (shouldLoadCategories) {
      const resp = await quickSearchByQuery({ entityType: 'category', query: searchQuery, sort, size, start, includeFields, excludeFields })

      if (updateState) {
        await dispatch('registerCategoryMapping', { categories: resp.items })

        commit(types.CATEGORY_UPD_CATEGORIES, { ...resp, includeFields, excludeFields })
        EventBus.$emit('category-after-list', { query: searchQuery, sort, size, start, list: resp })
      }

      return resp
    }

    const list = { items: state.list, total: state.list.length }

    if (updateState) {
      EventBus.$emit('category-after-list', { query: searchQuery, sort, size, start, list })
    }

    return list
  },
  async registerCategoryMapping ({ dispatch }, { categories }) {
    const { storeCode, appendStoreCode } = currentStoreView()
    for (let category of categories) {
      if (category.url_path) {
        await dispatch('url/registerMapping', {
          url: localizedDispatcherRoute(category.url_path, storeCode),
          routeData: {
            params: {
              'slug': category.slug
            },
            'name': localizedDispatcherRouteName('category', storeCode, appendStoreCode)
          }
        }, { root: true })
      }
    }
  },

  /**
   * Load category object by specific field - using local storage/indexed Db
   * loadCategories() should be called at first!
   * @param {Object} commit
   * @param {String} key
   * @param {String} value
   * @param {Bool} setCurrentCategory default=true and means that state.current_category is set to the one loaded
   */
  single (context, { key, value, setCurrentCategory = true, setCurrentCategoryPath = true, populateRequestCacheTags = true, skipCache = false }) {
    const state = context.state
    const commit = context.commit
    const dispatch = context.dispatch

    return new Promise((resolve, reject) => {
      const fetchCat = ({ key, value }) => {
        if (key !== 'id' || value >= config.entities.category.categoriesRootCategorylId/* root category */) {
          context.dispatch('list', { key: key, value: value }).then(res => {
            if (res && res.items && res.items.length) {
              setcat(null, res.items[0]) // eslint-disable-line @typescript-eslint/no-use-before-define
            } else {
              reject(new Error('Category query returned empty result ' + key + ' = ' + value))
            }
          }).catch(reject)
        } else {
          reject(new Error('Category query returned empty result ' + key + ' = ' + value))
        }
      }
      let setcat = (error, mainCategory) => {
        if (!mainCategory) {
          fetchCat({ key, value })
          return
        }
        if (error) {
          Logger.error(error)()
          reject(error)
        }

        if (setCurrentCategory) {
          commit(types.CATEGORY_UPD_CURRENT_CATEGORY, mainCategory)
        }
        if (populateRequestCacheTags && mainCategory && Vue.prototype.$cacheTags) {
          Vue.prototype.$cacheTags.add(`C${mainCategory.id}`)
        }
        if (setCurrentCategoryPath) {
          let currentPath = []
          let recurCatFinder = (category) => {
            if (!category) {
              return
            }
            if (category.parent_id >= config.entities.category.categoriesRootCategorylId) {
              dispatch('single', { key: 'id', value: category.parent_id, setCurrentCategory: false, setCurrentCategoryPath: false }).then((sc) => { // TODO: move it to the server side for one requests OR cache in indexedDb
                if (!sc || sc.parent_id === sc.id) {
                  commit(types.CATEGORY_UPD_CURRENT_CATEGORY_PATH, currentPath)
                  EventBus.$emit('category-after-single', { category: mainCategory })
                  return resolve(mainCategory)
                }
                currentPath.unshift(sc)
                recurCatFinder(sc)
              }).catch(err => {
                Logger.error(err)()
                commit(types.CATEGORY_UPD_CURRENT_CATEGORY_PATH, currentPath) // this is the case when category is not binded to the root tree - for example 'Erin Recommends'
                resolve(mainCategory)
              })
            } else {
              commit(types.CATEGORY_UPD_CURRENT_CATEGORY_PATH, currentPath)
              EventBus.$emit('category-after-single', { category: mainCategory })
              resolve(mainCategory)
            }
          }
          if (typeof mainCategory !== 'undefined') {
            recurCatFinder(mainCategory) // TODO: Store breadcrumbs in IndexedDb for further usage to optimize speed?
          } else {
            reject(new Error('Category query returned empty result ' + key + ' = ' + value))
          }
        } else {
          EventBus.$emit('category-after-single', { category: mainCategory })
          resolve(mainCategory)
        }
      }

      let foundInLocalCache = false
      if (state.list.length > 0 && !skipCache) { // SSR - there were some issues with using localForage, so it's the reason to use local state instead, when possible
        let category = state.list.find((itm) => { return itm[key] === value })
        // Check if category exists in the store OR we have recursively reached Default category (id=1)
        if (category && value >= config.entities.category.categoriesRootCategorylId/** root category parent */) {
          foundInLocalCache = true
          setcat(null, category)
        }
      }
      if (!foundInLocalCache) {
        if (skipCache || isServer) {
          fetchCat({ key, value })
        } else {
          const catCollection = StorageManager.get('categories')
          // Check if category does not exist in the store AND we haven't recursively reached Default category (id=1)
          catCollection.getItem(entityKeyName(key, value), setcat)
        }
      }
    })
  },
  /**
   * Filter category products
   */
  products (context, { populateAggregations = false, filters = [], searchProductQuery, current = 0, perPage = 50, sort = '', includeFields = null, excludeFields = null, configuration = null, append = false, skipCache = false, cacheOnly = false }) {
    context.dispatch('setSearchOptions', {
      populateAggregations,
      filters,
      current,
      perPage,
      includeFields,
      excludeFields,
      configuration,
      append,
      sort
    })

    let prefetchGroupProducts = true
    if (config.entities.twoStageCaching && config.entities.optimize && !isServer && !rootStore.state.twoStageCachingDisabled) { // only client side, only when two stage caching enabled
      includeFields = config.entities.productListWithChildren.includeFields // we need configurable_children for filters to work
      excludeFields = config.entities.productListWithChildren.excludeFields
      prefetchGroupProducts = false
      Logger.log('Using two stage caching for performance optimization - executing first stage product pre-fetching')()
    } else {
      prefetchGroupProducts = true
      if (rootStore.state.twoStageCachingDisabled) {
        Logger.log('Two stage caching is disabled runtime because of no performance gain')()
      } else {
        Logger.log('Two stage caching is disabled by the config')()
      }
    }
    if (cacheOnly) {
      excludeFields = null
      includeFields = null
      Logger.log('Caching request only, no state update')()
    }
    let t0 = new Date().getTime()

    const precachedQuery = searchProductQuery
    let productPromise = rootStore.dispatch('product/list', {
      query: precachedQuery,
      start: current,
      size: perPage,
      excludeFields: excludeFields,
      includeFields: includeFields,
      configuration: configuration,
      append: append,
      sort: sort,
      updateState: !cacheOnly,
      prefetchGroupProducts: prefetchGroupProducts
    }).then((res) => {
      let t1 = new Date().getTime()
      rootStore.state.twoStageCachingDelta1 = t1 - t0

      let subloaders = []
      if (!res || (res.noresults)) {
        rootStore.dispatch('notification/spawnNotification', {
          type: 'warning',
          message: i18n.t('No products synchronized for this category. Please come back while online!'),
          action1: { label: i18n.t('OK') }
        })
        if (!append) rootStore.dispatch('product/reset')
        rootStore.state.product.list = { items: [] } // no products to show TODO: refactor to rootStore.state.category.reset() and rootStore.state.product.reset()
        // rootStore.state.category.filters = { color: [], size: [], price: [] }
        return []
      } else {
        if (config.products.filterUnavailableVariants && config.products.configurableChildrenStockPrefetchStatic) { // prefetch the stock items
          const skus = []
          let prefetchIndex = 0
          res.items.map(i => {
            if (config.products.configurableChildrenStockPrefetchStaticPrefetchCount > 0) {
              if (prefetchIndex > config.products.configurableChildrenStockPrefetchStaticPrefetchCount) return
            }
            skus.push(i.sku) // main product sku to be checked anyway
            if (i.type_id === 'configurable' && i.configurable_children && i.configurable_children.length > 0) {
              for (const confChild of i.configurable_children) {
                const cachedItem = context.rootState.stock.cache[confChild.id]
                if (typeof cachedItem === 'undefined' || cachedItem === null) {
                  skus.push(confChild.sku)
                }
              }
              prefetchIndex++
            }
          })
          for (const chunkItem of chunk(skus, 15)) {
            rootStore.dispatch('stock/list', { skus: chunkItem, skipCache }) // store it in the cache
          }
        }
        if (populateAggregations === true && res.aggregations) { // populate filter aggregates
          for (let attrToFilter of filters) { // fill out the filter options
            let filterOptions = []

            let uniqueFilterValues = new Set<string>()
            if (attrToFilter !== 'price') {
              if (res.aggregations['agg_terms_' + attrToFilter]) {
                let buckets = res.aggregations['agg_terms_' + attrToFilter].buckets
                if (res.aggregations['agg_terms_' + attrToFilter + '_options']) {
                  buckets = buckets.concat(res.aggregations['agg_terms_' + attrToFilter + '_options'].buckets)
                }

                for (let option of buckets) {
                  uniqueFilterValues.add(toString(option.key))
                }
              }

              uniqueFilterValues.forEach(key => {
                const label = optionLabel(rootStore.state.attribute, { attributeKey: attrToFilter, optionId: key })
                if (trim(label) !== '') { // is there any situation when label could be empty and we should still support it?
                  filterOptions.push({
                    id: key,
                    label: label
                  })
                }
              });
            } else { // special case is range filter for prices
              const storeView = currentStoreView()
              const currencySign = storeView.i18n.currencySign
              if (res.aggregations['agg_range_' + attrToFilter]) {
                let index = 0
                let count = res.aggregations['agg_range_' + attrToFilter].buckets.length
                for (let option of res.aggregations['agg_range_' + attrToFilter].buckets) {
                  filterOptions.push({
                    id: option.key,
                    from: option.from,
                    to: option.to,
                    label: (index === 0 || (index === count - 1)) ? (option.to ? '< ' + currencySign + option.to : '> ' + currencySign + option.from) : currencySign + option.from + (option.to ? ' - ' + option.to : '')// TODO: add better way for formatting, extract currency sign
                  })
                  index++
                }
              }
            }
            context.dispatch('addAvailableFilter', {
              key: attrToFilter,
              options: filterOptions
            })
          }
        }
      }
      return subloaders
    }).catch((err) => {
      Logger.error(err)()
      rootStore.dispatch('notification/spawnNotification', {
        type: 'warning',
        message: i18n.t('No products synchronized for this category. Please come back while online!'),
        action1: { label: i18n.t('OK') }
      })
    })

    if (config.entities.twoStageCaching && config.entities.optimize && !isServer && !rootStore.state.twoStageCachingDisabled && !cacheOnly) { // second stage - request for caching entities; if cacheOnly set - the caching took place with the stage1 request!
      Logger.log('Using two stage caching for performance optimization - executing second stage product caching', 'category') // TODO: in this case we can pre-fetch products in advance getting more products than set by pageSize()
      rootStore.dispatch('product/list', {
        query: precachedQuery,
        start: current,
        size: perPage,
        excludeFields: null,
        includeFields: null,
        configuration: configuration,
        sort: sort,
        updateState: false, // not update the product listing - this request is only for caching
        prefetchGroupProducts: prefetchGroupProducts
      }).catch((err) => {
        Logger.info("Problem with second stage caching - couldn't store the data", 'category')()
        Logger.info(err, 'category')()
      }).then((res) => {
        let t2 = new Date().getTime()
        rootStore.state.twoStageCachingDelta2 = t2 - t0
        Logger.log('Using two stage caching for performance optimization - Time comparison stage1 vs stage2' + rootStore.state.twoStageCachingDelta1 + rootStore.state.twoStageCachingDelta2, 'category')()
        if (rootStore.state.twoStageCachingDelta1 > rootStore.state.twoStageCachingDelta2) { // two stage caching is not making any good
          rootStore.state.twoStageCachingDisabled = true
          Logger.log('Disabling two stage caching', 'category')()
        }
      })
    }
    return productPromise
  },
  addAvailableFilter ({ commit }, { key, options } = {}) {
    if (key) commit(types.CATEGORY_ADD_AVAILABLE_FILTER, { key, options })
  },
  resetFilters (context) {
    context.commit(types.CATEGORY_REMOVE_FILTERS)
  },
  searchProductQuery (context, productQuery) {
    context.commit(types.CATEGORY_UPD_SEARCH_PRODUCT_QUERY, productQuery)
  },
  setSearchOptions ({ commit }, searchOptions) {
    commit(types.CATEGORY_SET_SEARCH_OPTIONS, searchOptions)
  },
  mergeSearchOptions ({ commit }, searchOptions) {
    commit(types.CATEGORY_MERGE_SEARCH_OPTIONS, searchOptions)
  }
}

export default actions
