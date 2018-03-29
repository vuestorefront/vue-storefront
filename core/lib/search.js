import config from 'config'
import _ from 'lodash'
import { slugify } from 'core/helpers'
import hash from 'object-hash'

let es = require('elasticsearch')

let client = new es.Client({
  host: config.elasticsearch.host,
  httpAuth: config.elasticsearch.httpAuth,
  log: 'debug',
  apiVersion: '5.5',
  requestTimeout: 5000
})

function isOnline () {
  if (typeof navigator !== 'undefined') {
    return navigator.onLine
  } else {
    return true // SSR
  }
}
/**
 * Helper function to handle ElasticSearch Results
 * @param {Object} resp result from ES call
 * @param {Int} start pagination data
 * @param {Int} size pagination data
 */
function _handleEsResult (resp, start = 0, size = 50) {
  if (resp == null) {
    throw new Error('Invalid ES result - null not exepcted')
  }
  if (resp.hasOwnProperty('hits')) {
    return {
      items: _.map(resp.hits.hits, function (hit) {
        return Object.assign(hit._source, { _score: hit._score, slug: hit._source.hasOwnProperty('name') ? slugify(hit._source.name) + '-' + hit._source.id : '' }) // TODO: assign slugs server side
      }), // TODO: add scoring information
      total: resp.hits.total,
      start: start,
      perPage: size,
      aggregations: resp.aggregations
    }
  } else {
    if (resp.error) {
      throw new Error(JSON.stringify(resp.error))
    } else {
      throw new Error('Unknown error with ES result in _handleEsResult')
    }
  }
}

/**
 * Search ElasticSearch catalog of products using simple text query
 * Use bodybuilder to build the query, aggregations etc: http://bodybuilder.js.org/
 * @param {Object} query elasticSearch request body
 * @param {Int} start start index
 * @param {Int} size page size
 * @return {Promise}
 */
export function quickSearchByQuery ({ query, start = 0, size = 50, entityType = 'product', sort = '', index = null }) {
  size = parseInt(size)
  if (size <= 0) size = 50
  if (start < 0) start = 0

  return new Promise((resolve, reject) => {
    const esQuery = {
      index: index || config.elasticsearch.index, // TODO: add grouped prodduct and bundled product support
      type: entityType,
      body: query,
      size: size,
      from: start,
      sort: sort
    }
    const cache = global.db.elasticCacheCollection // switch to appcache?
    const cacheKey = hash(esQuery)
    let servedFromCache = false
    const benchmarkTime = new Date()
    cache.getItem(cacheKey, (err, res) => {
      if (err) {
        console.log(err)
      }

      if (res !== null) {
        res.cache = true
        res.noresults = false
        res.offline = !isOnline() // TODO: refactor it to checking ES heartbit
        resolve(res)
        console.info('Result from cache for ' + cacheKey + ' (' + entityType + '), ms=' + (new Date().getTime() - benchmarkTime.getTime()))
        servedFromCache = true
      } else {
        if (!isOnline()) {
          console.info('No results and offline ' + cacheKey + ' (' + entityType + '), ms=' + (new Date().getTime() - benchmarkTime.getTime()))

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
    }).catch((err) => { console.error('Cannot read cache for ' + cacheKey + ', ' + err) })
    client.search(esQuery).then(function (resp) { // we're always trying to populate cache - when online
      const res = _handleEsResult(resp, start, size)
      cache.setItem(cacheKey, res).catch((err) => { console.error('Cannot store cache for ' + cacheKey + ', ' + err) })
      if (!servedFromCache) { // if navigator onLine == false means ES is unreachable and probably this will return false; sometimes returned false faster than indexedDb cache returns result ...
        console.info('Result from ES for ' + cacheKey + ' (' + entityType + '),  ms=' + (new Date().getTime() - benchmarkTime.getTime()))
        res.cache = false
        res.noresults = false
        res.offline = false
        resolve(res)
      }
    }).catch(function (err) {
      // reject(err)
      console.error(err)
    })
  })
}

/**
   * Search ElasticSearch catalog of products using simple text query
   * @param {String} queryText full text search query
   * @param {Int} start start index
   * @param {Int} size page size
   * @return {Promise}
   */
export function quickSearchByText ({ queryText, start = 0, size = 50 }) {
  size = parseInt(size)
  if (size <= 0) size = 50
  if (start < 0) start = 0

  return new Promise((resolve, reject) => {
    client.search({
      index: config.elasticsearch.index, // TODO: add grouped prodduct and bundled product support
      type: 'product',
      q: queryText,
      size: size,
      from: start
    }).then(function (resp) {
      resolve(_handleEsResult(resp, start, size))
    }).catch(function (err) {
      reject(err)
    })
  })
}
