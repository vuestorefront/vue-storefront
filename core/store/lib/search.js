import hash from 'object-hash'
import config from 'config'
import SearchAdapterFactory from './search/adapter/factory'

const factory = new SearchAdapterFactory()
let adapterName = config.server.api
let searchAdapter = factory.getSearchAdapter(adapterName)

export function isOnline () {
  if (typeof navigator !== 'undefined') {
    return navigator.onLineß
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
export function quickSearchByQuery ({ query, start = 0, size = 50, entityType = 'product', sort = '', storeCode = null, excludeFields = null, includeFields = null, skipCache = false }) {
  size = parseInt(size)
  if (size <= 0) size = 50
  if (start < 0) start = 0

  return new Promise((resolve, reject) => {
    const Query = {
      store: storeCode, // TODO: add grouped prodduct and bundled product support
      type: entityType,
      searchQuery: query,
      size: size,
      from: start,
      sort: sort
    }

    if (excludeFields) Query._sourceExclude = excludeFields
    if (includeFields) Query._sourceInclude = includeFields
    const cache = global.$VS.db.elasticCacheCollection // switch to appcache?
    const cacheKey = hash(Query)
    let servedFromCache = false
    const benchmarkTime = new Date()
    if (!skipCache) {
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
    }
    searchAdapter.search(Query).then(resp => { // we're always trying to populate cache - when online
      const res = searchAdapter.handleResult(resp, Query.type, start, size)
      cache.setItem(cacheKey, res).catch((err) => { console.error('Cannot store cache for ' + cacheKey + ', ' + err) })
      if (!servedFromCache) { // if navigator onLine == false means ES is unreachable and probably this will return false; sometimes returned false faster than indexedDb cache returns result ...
        console.debug('Result from ES for ' + cacheKey + ' (' + entityType + '),  ms=' + (new Date().getTime() - benchmarkTime.getTime()))
        res.cache = false
        res.noresults = false
        res.offline = false
        resolve(res)
      }
    }).catch((err) => {
      // reject(err)
      console.error(err)
    })
  })
}
