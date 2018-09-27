import Vue from 'vue'
import { currentStoreView } from './multistore'
import { sha1 } from 'object-hash'
import rootStore from '../'
import config from 'config'
import SearchAdapterFactory from './search/adapter/factory'
import Request from '../types/search/Request'
import Response from '../types/search/Response'

const factory = new SearchAdapterFactory()
let adapterName = config.server.api
let searchAdapter = factory.getSearchAdapter(adapterName)

export function isOnline () {
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
export function quickSearchByQuery ({ query, start = 0, size = 50, entityType = 'product', sort = '', storeCode = null, excludeFields = null, includeFields = null }): Promise<Response> {
  if (size <= 0) size = 50
  if (start < 0) start = 0

  return new Promise((resolve, reject) => {
    const storeView = currentStoreView()
    const Request: Request = {
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

    if (rootStore.state.config.usePriceTiers && (entityType === 'product') && rootStore.state.user.groupId) {
        Request.groupId = rootStore.state.user.groupId
    }

    const cache = Vue.prototype.$db.elasticCacheCollection // switch to appcache?
    let servedFromCache = false
    const cacheKey = sha1(Request)
    const benchmarkTime = new Date()

    cache.getItem(cacheKey, (err, res) => {
      if (err) console.log(err)
      if (res !== null) {
        res.cache = true
        res.noresults = false
        res.offline = !isOnline() // TODO: refactor it to checking ES heartbit
        resolve(res)
        console.debug('Result from cache for ' + cacheKey + ' (' + entityType + '), ms=' + (new Date().getTime() - benchmarkTime.getTime()))
        servedFromCache = true
      } else {
        if (!isOnline()) {
          console.debug('No results and offline ' + cacheKey + ' (' + entityType + '), ms=' + (new Date().getTime() - benchmarkTime.getTime()))
          res = {
            items: [],
            total: 0,
            start: 0,
            perPage: 0,
            aggregations: {},
            offline: true,
            cache: true,
            noresults: true
          }
          servedFromCache = true
          resolve(res)
        }
      }
    }).catch((err) => {
      console.error('Cannot read cache for ' + cacheKey + ', ' + err)
    })

    /* use only for cache */
    if (Request.groupId) {
      delete Request.groupId
    }

    if (rootStore.state.config.usePriceTiers && rootStore.state.user.groupToken) {
        Request.groupToken = rootStore.state.user.groupToken
    }

    if (!searchAdapter.entities[Request.type]) {
      throw new Error('No entity type registered for ' + Request.type )
    }

    searchAdapter.search(Request).then((resp) => { // we're always trying to populate cache - when online
      const res = searchAdapter.entities[Request.type].resultPorcessor(resp, start, size)

      if (res) { // otherwise it can be just a offline mode
        cache.setItem(cacheKey, res).catch((err) => { console.error('Cannot store cache for ' + cacheKey + ', ' + err) })
        if (!servedFromCache) { // if navigator onLine == false means ES is unreachable and probably this will return false; sometimes returned false faster than indexedDb cache returns result ...
          console.debug('Result from ES for ' + cacheKey + ' (' + entityType + '),  ms=' + (new Date().getTime() - benchmarkTime.getTime()))
          res.cache = false
          res.noresults = false
          res.offline = false
          resolve(res)
        }
      }
    }).catch(err => {
      reject(err)
    })
  })
}
