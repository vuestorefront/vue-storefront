import Vue from 'vue'

import { currentStoreView } from '@vue-storefront/core/lib/multistore'
import { sha3_224 } from 'js-sha3'
import rootStore from '@vue-storefront/core/store'
import { getSearchAdapter } from './search/adapter/searchAdapterFactory'
import { SearchRequest } from '@vue-storefront/core/types/search/SearchRequest'
import { SearchResponse } from '@vue-storefront/core/types/search/SearchResponse'
import { Logger } from '@vue-storefront/core/lib/logger'
import config from 'config'
import { isServer } from '@vue-storefront/core/helpers'
import { StorageManager } from '@vue-storefront/core/lib/storage-manager'

// TODO - use one from helpers instead
export function isOnline (): boolean {
  if (typeof navigator !== 'undefined') {
    return navigator.onLine
  } else {
    return true // SSR
  }
}

/**
 * Search ElasticSearch catalog of products using simple text query
 * Use bodybuilder to build the query, aggregations etc: http://bodybuilder.js.org/
 * @param {Object} query is the object of searchQuery class
 * @param {Int} start start index
 * @param {Int} size page size
 * @return {Promise}
 */
export const quickSearchByQuery = async ({ query = {}, start = 0, size = 50, entityType = 'product', sort = '', storeCode = null, excludeFields = null, includeFields = null } = {}): Promise<SearchResponse> => {
  const searchAdapter = await getSearchAdapter()
  if (size <= 0) size = 50
  if (start < 0) start = 0

  return new Promise(async (resolve, reject) => {
    const storeView = currentStoreView()
    const Request: SearchRequest = {
      store: storeCode || storeView.storeCode, // TODO: add grouped product and bundled product support
      type: entityType,
      searchQuery: query,
      groupToken: null,
      groupId: null,
      size: size,
      from: start,
      sort: sort
    }

    if (excludeFields) Request._sourceExclude = excludeFields
    if (includeFields) Request._sourceInclude = includeFields

    if (config.usePriceTiers && (entityType === 'product') && rootStore.state.user.groupId) {
      Request.groupId = rootStore.state.user.groupId
    }

    const cache = StorageManager.get('elasticCache') // switch to appcache?
    let servedFromCache = false
    const cacheKey = sha3_224(JSON.stringify(Request))
    const benchmarkTime = new Date()

    try {
      const res = await cache.getItem(cacheKey)
      if (res !== null) {
        res.cache = true
        res.noresults = false
        res.offline = !isOnline() // TODO: refactor it to checking ES heartbit
        Logger.debug('Result from cache for ' + cacheKey + ' (' + entityType + '), ms=' + (new Date().getTime() - benchmarkTime.getTime()))()

        servedFromCache = true
        resolve(res)
        return
      }
    } catch (err) {
      Logger.error('Cannot read cache for ' + cacheKey + ', ' + err)()
    }

    /* use only for cache */
    if (Request.groupId) {
      delete Request.groupId
    }

    if (rootStore.state.user.groupToken) {
      Request.groupToken = rootStore.state.user.groupToken
    }

    if (!searchAdapter.entities[Request.type]) {
      throw new Error('No entity type registered for ' + Request.type)
    }

    searchAdapter.search(Request).then((resp) => { // we're always trying to populate cache - when online
      const res = searchAdapter.entities[Request.type].resultProcessor(resp, start, size)

      if (res) { // otherwise it can be just a offline mode
        cache.setItem(cacheKey, res, null, config.elasticsearch.disablePersistentQueriesCache).catch((err) => { Logger.error('Cannot store cache for ' + cacheKey + ', ' + err)() })
        if (!servedFromCache) { // if navigator onLine == false means ES is unreachable and probably this will return false; sometimes returned false faster than indexedDb cache returns result ...
          Logger.debug('Result from ES for ' + cacheKey + ' (' + entityType + '),  ms=' + (new Date().getTime() - benchmarkTime.getTime()))()
          res.cache = false
          res.noresults = false
          res.offline = false
          resolve(res)
        }
      }
    }).catch(err => {
      if (!servedFromCache) {
        if (!isServer) {
          Logger.debug('No results and offline ' + cacheKey + ' (' + entityType + '), ms=' + (new Date().getTime() - benchmarkTime.getTime()))()
          const res = {
            items: [],
            total: 0,
            start: 0,
            perPage: 0,
            aggregations: {},
            offline: true,
            cache: true,
            noresults: true,
            suggestions: {}
          }
          resolve(res)
        } else {
          Logger.error('Can not connect the vue-storefront-api / ElasticSearch instance!', 'search', err)()
          reject(err)
        }
      }
      reject(err)
    })
  })
}
