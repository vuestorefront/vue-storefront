import { UrlState } from '../types/UrlState'
import { ActionTree } from 'vuex';
import * as types from './mutation-types'
// you can use this storage if you want to enable offline capabilities
import { cacheStorage } from '../'
import { parseURLQuery } from '@vue-storefront/core/helpers'
import SearchQuery from '@vue-storefront/core/lib/search/searchQuery'
import { processDynamicRoute, normalizeUrlPath } from '../helpers'
import { storeCodeFromRoute } from '@vue-storefront/core/lib/multistore'

const _parametrizedRoutedata = (routeData, query, storeCodeInPath) => {
  routeData.params = Object.assign({}, routeData.params || {}, query)
  if (storeCodeInPath) {
    routeData.name = storeCodeInPath + '-' + routeData.name
  }
  return routeData
}
// it's a good practice for all actions to return Promises with effect of their execution
export const actions: ActionTree<UrlState, any> = {
  // if you want to use cache in your module you can load cached data like this
  registerMapping ({ commit }, { url, routeData }) {
    return new Promise ((resolve, reject) => {
      commit(types.REGISTER_MAPPING, { url, routeData })
      cacheStorage.setItem(url, routeData).then(result => {
        resolve(routeData)
      }).catch(() => reject())
    })
  },
  /**
   * Register dynamic vue-router routes
   */
  registerDynamicRoutes ({ state, dispatch }) {
    if (state.dispatcherMap) {
      for (const [url, routeData] of Object.entries(state.dispatcherMap)) {
        processDynamicRoute (routeData, url)
        dispatch('registerMapping', { url, routeData })
      }
    }
  },
  mapUrl ({ state, dispatch }, { url, query }) {
    const parsedQuery = typeof query === 'string' ? parseURLQuery(query) : query
    const storeCodeInPath = storeCodeFromRoute(url)
    url = normalizeUrlPath(url, true)

    return new Promise ((resolve, reject) => {
      if (state.dispatcherMap[url]) {
        return resolve (_parametrizedRoutedata(state.dispatcherMap[url], query, storeCodeInPath))
      }
      cacheStorage.getItem(url).then(routeData => {
        if (routeData !== null) {
          return resolve(_parametrizedRoutedata(routeData, query, storeCodeInPath))
        } else {
          dispatch('mappingFallback', { url, params: parsedQuery }).then((routeData) => {
            dispatch('registerMapping', { url, routeData }) // register mapping for further usage
            resolve(_parametrizedRoutedata(routeData, query, storeCodeInPath))
          }).catch(reject)
        }
      }).catch(reject)
    })
  },
  /**
   * Router mapping fallback - get the proper URL from API
   * This method could be overriden in custom module to provide custom URL mapping logic
   */
  mappingFallback ({ commit, dispatch }, { url, params }) {
    return new Promise ((resolve, reject) => {
      const productQuery = new SearchQuery()
      productQuery.applyFilter({key: 'url_path', value: {'eq': url}}) // Tees category
      dispatch('product/list', { query: productQuery }, { root: true }).then((products) => {
       if (products && products.items.length > 0) {
          const product = products.items[0]
          resolve({
            name: product.type_id + '-product',
            params: {
              slug: product.slug,
              parentSku: product.sku,
              childSku: params['childSku'] ? params['childSku'] : product.sku
            }
          })
        } else {
          dispatch('category/single', { key: 'url_path', value: url }, { root: true }).then((category) => {
            if (category !== null) {
              resolve({
                name: 'category',
                params: {
                  slug: category.slug
                }
              })
            } else {
              resolve(null)
            }
          }).catch(e => reject(e))
        }
      }).catch(e => reject(e))


    })
  }
}