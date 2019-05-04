import { UrlState } from '../types/UrlState'
import { ActionTree } from 'vuex';
import * as types from './mutation-types'
// you can use this storage if you want to enable offline capabilities
import { cacheStorage } from '../'
import queryString from 'query-string'
import SearchQuery from '@vue-storefront/core/lib/search/searchQuery'
import { processDynamicRoute, normalizeUrlPath, parametrizeRouteData } from '../helpers'
import { storeCodeFromRoute, removeStoreCodeFromRoute } from '@vue-storefront/core/lib/multistore'

// it's a good practice for all actions to return Promises with effect of their execution
export const actions: ActionTree<UrlState, any> = {
  // if you want to use cache in your module you can load cached data like this
  async registerMapping ({ commit }, { url, routeData }: { url: string, routeData: any}) {
    commit(types.REGISTER_MAPPING, { url, routeData })
    await cacheStorage.setItem(url, routeData)
    return routeData
  },
  /**
   * Register dynamic vue-router routes
   */
  async registerDynamicRoutes ({ state, dispatch }) {
    if (state.dispatcherMap) {
      for (const [url, routeData] of Object.entries(state.dispatcherMap)) {
        processDynamicRoute (routeData, url)
        dispatch('registerMapping', { url, routeData })
      }
    }
  },
  mapUrl ({ state, dispatch }, { url, query }: { url: string, query: string}) {
    const parsedQuery = typeof query === 'string' ? queryString.parse(query) : query
    const storeCodeInPath = storeCodeFromRoute(url)
    url = normalizeUrlPath(url)

    return new Promise ((resolve, reject) => {
      if (state.dispatcherMap[url]) {
        return resolve (parametrizeRouteData(state.dispatcherMap[url], query, storeCodeInPath))
      }
      cacheStorage.getItem(url).then(routeData => {
        if (routeData !== null) {
          return resolve(parametrizeRouteData(routeData, query, storeCodeInPath))
        } else {
          dispatch('mappingFallback', { url, params: parsedQuery }).then((routeData) => {
            dispatch('registerMapping', { url, routeData }) // register mapping for further usage
            resolve(parametrizeRouteData(routeData, query, storeCodeInPath))
          }).catch(reject)
        }
      }).catch(reject)
    })
  },
  
  /**
   * Router mapping fallback - get the proper URL from API
   * This method could be overriden in custom module to provide custom URL mapping logic
   */
  async mappingFallback ({ dispatch }, { url, params }: { url: string, params: any}) {
    const productQuery = new SearchQuery()
    url = (removeStoreCodeFromRoute(url) as string)
    productQuery.applyFilter({key: 'url_path', value: {'eq': url}}) // Tees category
    const products = await dispatch('product/list', { query: productQuery }, { root: true })
    if (products && products.items && products.items.length) {
      const product = products.items[0]
      return {
        name: product.type_id + '-product',
        params: {
          slug: product.slug,
          parentSku: product.sku,
          childSku: params['childSku'] ? params['childSku'] : product.sku
        }
      }
    } else {
      const category = await dispatch('category/single', { key: 'url_path', value: url }, { root: true })
      if (category !== null) {
        return {
          name: 'category',
          params: {
            slug: category.slug
          }
        }
      }
    }
  }
}
