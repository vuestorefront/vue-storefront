import { transformProductUrl, transformCategoryUrl, transformCmsPageUrl } from '@vue-storefront/core/modules/url/helpers/transformUrl';
import { isServer } from '@vue-storefront/core/helpers';
import { UrlState } from '../types/UrlState'
import { ActionTree } from 'vuex';
// you can use this storage if you want to enable offline capabilities
import { cacheStorage } from '../'
import queryString from 'query-string'
import config from 'config'
import { SearchQuery } from 'storefront-query-builder'
import { preProcessDynamicRoutes, normalizeUrlPath, parametrizeRouteData, getFallbackRouteData } from '../helpers'
import { removeStoreCodeFromRoute, currentStoreView, localizedDispatcherRouteName, adjustMultistoreApiUrl } from '@vue-storefront/core/lib/multistore'
import storeCodeFromRoute from '@vue-storefront/core/lib/storeCodeFromRoute'
import fetch from 'isomorphic-fetch'
import { Logger } from '@vue-storefront/core/lib/logger'
import { processURLAddress } from '@vue-storefront/core/helpers';
import * as categoryMutationTypes from '@vue-storefront/core/modules/catalog-next/store/category/mutation-types'
import * as cmsPageMutationTypes from '@vue-storefront/core/modules/cms/store/page/mutation-types'
import isEqual from 'lodash-es/isEqual'
import * as types from './mutation-types'
import omit from 'lodash-es/omit'
import { storeProductToCache } from '@vue-storefront/core/modules/catalog/helpers/search';

// it's a good practice for all actions to return Promises with effect of their execution
export const actions: ActionTree<UrlState, any> = {
  // if you want to use cache in your module you can load cached data like this
  async registerMapping ({ state }, { url, routeData }: { url: string, routeData: any}) {
    if (!state.dispatcherMap[url]) {
      state.dispatcherMap[url] = routeData
    }
    try {
      await cacheStorage.setItem(normalizeUrlPath(url), routeData, null, config.seo.disableUrlRoutesPersistentCache)
    } catch (err) {
      if (
        err.name === 'QuotaExceededError' ||
        err.name === 'NS_ERROR_DOM_QUOTA_REACHED'
      ) { // quota exceeded error
        cacheStorage.clear() // clear the url cache if quota has been exceeded
      }
    }
    return routeData
  },
  /**
   * Register dynamic vue-router routes
   */
  async registerDynamicRoutes ({ state, dispatch }) {
    if (!state.dispatcherMap) return

    preProcessDynamicRoutes(state.dispatcherMap)
    const registrationRoutePromises = Object.keys(state.dispatcherMap).map(url => {
      const routeData = state.dispatcherMap[url]
      return dispatch('registerMapping', { url, routeData })
    })
    await Promise.all(registrationRoutePromises)
  },
  mapUrl ({ state, dispatch }, { url, query }: { url: string, query: string}) {
    const parsedQuery = typeof query === 'string' ? queryString.parse(query) : query
    const storeCodeInPath = storeCodeFromRoute(url)
    url = normalizeUrlPath(url)
    return new Promise((resolve, reject) => {
      if (state.dispatcherMap[url]) {
        return resolve(parametrizeRouteData(state.dispatcherMap[url], query, storeCodeInPath))
      }
      cacheStorage.getItem(url).then(routeData => {
        if (routeData !== null) {
          return resolve(parametrizeRouteData(routeData, query, storeCodeInPath))
        } else {
          const mappingActionName = config.urlModule.enableMapFallbackUrl ? 'mapFallbackUrl' : 'mappingFallback'
          dispatch(mappingActionName, { url, params: parsedQuery }).then(mappedFallback => {
            const routeData = getFallbackRouteData({ mappedFallback, url })
            dispatch('registerMapping', { url, routeData }) // register mapping for further usage
            resolve(parametrizeRouteData(routeData, query, storeCodeInPath))
          }).catch(reject)
        }
      }).catch(reject)
    })
  },
  /**
   * @deprecated from 1.13
   * Router mapping fallback - get the proper URL from API
   * This method could be overriden in custom module to provide custom URL mapping logic
   */
  async mappingFallback ({ dispatch }, { url, params }: { url: string, params: any}) {
    console.warn(`
      Deprecated action mappingFallback - use mapFallbackUrl instead.
      You can enable mapFallbackUrl by changing 'config.urlModule.enableMapFallbackUrl' to true
    `)
    const { storeCode, appendStoreCode } = currentStoreView()
    const productQuery = new SearchQuery()
    url = (removeStoreCodeFromRoute(url.startsWith('/') ? url.slice(1) : url) as string)
    productQuery.applyFilter({ key: 'url_path', value: { 'eq': url } }) // Tees category
    const products = await dispatch('product/list', { query: productQuery }, { root: true })
    if (products && products.items && products.items.length) {
      console.log(url, productQuery)
      const product = products.items[0]
      return {
        name: localizedDispatcherRouteName(product.type_id + '-product', storeCode, appendStoreCode),
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
          name: localizedDispatcherRouteName('category', storeCode, appendStoreCode),
          params: {
            slug: category.slug
          }
        }
      }
    }
  },
  /**
   * Router mapping fallback - get the proper URL from API
   * This method could be overriden in custom module to provide custom URL mapping logic
   */
  async mapFallbackUrl ({ dispatch }, { url, params }: { url: string, params: any}) {
    url = (removeStoreCodeFromRoute(url.startsWith('/') ? url.slice(1) : url) as string)

    // search for record in ES based on `url`
    const fallbackData = await dispatch('getFallbackByUrl', { url, params })

    // if there is record in ES then map data
    if (fallbackData) {
      const [result] = await Promise.all([
        dispatch('transformFallback', { ...fallbackData, params }),
        dispatch('saveFallbackData', fallbackData)
      ])
      return result
    }

    return {
      name: 'page-not-found',
      params: {
        slug: 'page-not-found'
      }
    }
  },
  /**
   * Search for record in ES which contains url value (check which fields it searches in vsf-api config.urlModule.map.searchedFields)
   */
  async getFallbackByUrl (context, { url, params }) {
    try {
      const requestUrl = `${adjustMultistoreApiUrl(processURLAddress(config.urlModule.map_endpoint))}`
      let response: any = await fetch(
        requestUrl,
        {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            url,
            includeFields: null, // send `includeFields: null || undefined` to fetch all fields
            excludeFields: [],
            options: {
              prefetchGroupProducts: true,
              assignProductConfiguration: true
            },
            filters: { sku: params.childSku }
          })
        }
      )
      if (!response.ok) {
        return null
      }
      response = await response.json()
      return response
    } catch (err) {
      Logger.error('FetchError in request to ES: ', 'search', err)()
      return null
    }
  },
  /**
   * Transforms data to vue-router route format
   */
  async transformFallback (context, { _type, _source, params }) {
    switch (_type) {
      case 'product': {
        return transformProductUrl(_source, params)
      }
      case 'category': {
        return transformCategoryUrl(_source)
      }
      case 'cms_page': {
        return transformCmsPageUrl(_source)
      }
      default: {
        return {
          name: 'page-not-found',
          params: {
            slug: 'page-not-found'
          }
        }
      }
    }
  },
  /**
   * Here we can save data based on _type, so there will be no need to create another request for it.
   */
  async saveFallbackData ({ commit }, { _type, _source }) {
    switch (_type) {
      case 'product': {
        storeProductToCache(_source, 'sku')
        break
      }
      case 'category': {
        commit('category-next/' + categoryMutationTypes.CATEGORY_ADD_CATEGORY, _source, { root: true })
        break
      }
      case 'cms_page': {
        commit('cmsPage/' + cmsPageMutationTypes.CMS_PAGE_ADD_CMS_PAGE, _source, { root: true })
        commit('cmsPage/' + cmsPageMutationTypes.CMS_PAGE_SET_CURRENT, _source, { root: true })
        break
      }
      default: {
        break
      }
    }
  },
  setCurrentRoute ({ commit, state, rootGetters }, { to, from } = {}) {
    commit(types.SET_CURRENT_ROUTE, {
      ...to,
      scrollPosition: { ...state.prevRoute.scrollPosition },
      categoryPageSize: state.prevRoute.categoryPageSize
    })

    const sameAsPrevRoute = isEqual(
      omit(state.prevRoute, ['scrollPosition', 'categoryPageSize']),
      omit(state.currentRoute, ['scrollPosition', 'categoryPageSize'])
    )
    const hasDifferentPath = (state.currentRoute && state.currentRoute.path) !== (from && from.path)
    commit(types.IS_BACK_ROUTE, sameAsPrevRoute && hasDifferentPath)

    const scrollPosition = {
      x: !isServer ? window.pageXOffset : 0,
      y: !isServer ? window.pageYOffset : 0
    }
    commit(types.SET_PREV_ROUTE, {
      ...from,
      scrollPosition,
      categoryPageSize: rootGetters['category-next/getCategoryProducts'].length
    })
  }
}
